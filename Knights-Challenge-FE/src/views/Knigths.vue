<template>
	<v-data-table
	  :headers="headers"
	  :items="knigths"
	  :sort-by="[{ key: 'calories', order: 'asc' }]"
	>
	  <template v-slot:top>
		<v-toolbar
		  flat
		>
		  <v-toolbar-title>Knigths</v-toolbar-title>
		  <v-divider
			class="mx-4"
			inset
			vertical
		  ></v-divider>
		  <v-spacer></v-spacer>		
		  <v-btn class="mb-2 bg-primary"	>
			<router-link to="register">Cadastrar Knigths</router-link>
				
		  </v-btn>
		  <v-dialog
			v-model="dialogUp"
			max-width="500px"
		  >
			
			<v-card>
			  <v-card-title>
				<span class="text-h5">{{ formTitle }}</span>
			  </v-card-title>
  
			  <v-card-text>
				<v-container>
				  <v-row>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field
						v-model="editedItem.apelido"
						label="Apelido"
					  ></v-text-field>
					</v-col>
					
				  </v-row>
				</v-container>
			  </v-card-text>
  
			  <v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
				  color="blue-darken-1"
				  variant="text"
				  @click="closeUp"
				>
				  Cancel
				</v-btn>
				<v-btn
				  color="blue-darken-1"
				  variant="text"
				  @click="upKnigth"
				>
				  Save
				</v-btn>
			  </v-card-actions>
			</v-card>
		  </v-dialog>
		  <v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
			  <v-card-title class="text-h5 text-center">Tem certeza que quer deletar esse Knigth?</v-card-title>
			  <v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
				<v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
				<v-spacer></v-spacer>
			  </v-card-actions>
			</v-card>
		  </v-dialog>	
		</v-toolbar>
	  </template>
	  <template v-slot:item.acao="{ item }">
		<router-link :to="{name:'detalhes', params: {id:item.id}}">
			<v-icon
		  class="me-2"
		  size="small"
		  
		>
		mdi-eye
		
		</v-icon>
		<v-tooltip
        activator="parent"
        location="top"
      >+ Detalhes</v-tooltip>
		</router-link>
		
		<v-icon
		  class="me-2"
		  size="small"
		  @click="editItem(item)"
		>
		  mdi-pencil
		  
		</v-icon>
		<v-icon
		  size="small"
		  @click="deleteItem(item)" 
		>
		  mdi-delete
		</v-icon>

	  </template>
	  
	</v-data-table>
  </template>
  <script>
  import api from "../services/api.js";
  
  export default {	
	name: "Knigths",
    data: () => ({	 
      dialogCad: false,
	  dialogUp: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Nome',
          align: 'start',
          sortable: false,
          key: 'nome',
        },
        { title: 'Idade', key: 'Idade' },
        { title: 'Armas', key: 'Armas' },
        { title: 'Atributo', key: 'Atributo' },
        { title: 'Ataque', key: 'Ataque' },
		{ title: 'Experiência', key: 'Exp' },
        { title: 'Ação', key: 'acao', sortable: false },
      ],
      knigths: [],
      editedIndex: -1,
      editedItem: {
        
      },
      defaultItem: {
        
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Knigths' : 'Editar Knigths'
      },
    },

    watch: {
		dialogCad (val) {
			val || this.closeCad()
		},
		dialogUp (val) {
			val || this.closeUp()
		},
		dialogDelete (val) {
			val || this.closeDelete()
		},
    },

    mounted () {
	  this.getKnigths();
    },

    methods: {
		getKnigths() {
			api.getKnigthsAll()
			.then((res) => {
				this.initialize(res.data);
			})
			.catch((error) => {
			console.log(error);
			});
		},
		initialize (resKnigths) {
			this.knigths  = resKnigths.map((item) => {
				return {
					id: item._id,
					nome: item.name,
					apelido: item.nickname,
					Atributo: item.keyAttribute,
					Idade: this.getIdade(item.birthday),
					Armas: item.weapons.length,
					Ataque: this.calcAtaque(item.attributes[item.keyAttribute],this.getEquipped(item.weapons)),
					Exp:this.calcExp(this.getIdade(item.birthday)) ,
				};
				
			});
		},		
		upKnigth() {
			const data = {"nickname": this.editedItem.apelido}
			const id= this.editedItem.id
			api.upKnigth(id,data)
			.then((res) => {
			})
			.catch((error) => {
			console.log(error);
			});
			this.closeUp()
			this.getKnigths()
			
		},
		calcAtaque(keyAttribute,equippedWeapon) {
			const attack = 10 + this.mod(keyAttribute) + equippedWeapon 
			return attack
		},
		calcExp(age) {
			if (age == 0) {
				return 0
			} else {
				const exp = Math.floor((age - 7) * Math.pow(22, 1.45));
				
				return exp				
			}
			
		},
		getEquipped(weapons){		
			const wea = weapons.filter((item)=> item.equipped == true)
			if (wea == '') {
				return 0				
			} else {
				return wea[0]['mod']
				
			}
						
		},
		mod(keyAttr){
			if (keyAttr >= 0 && keyAttr <=8) {
				return -2;
			}else if (keyAttr >= 9 && keyAttr <=10) {
				return -1;
			}else if (keyAttr >= 11 && keyAttr <=12) {
				return 0;
			}else if (keyAttr >= 13 && keyAttr <=15) {
				return 1;
			} else if (keyAttr >= 16 && keyAttr <=18) {
				return 2;
			}else {
				return 3;
			}

		},
		getIdade(dateString) {
			const today = new Date();
			const birthDate = new Date(dateString);
			let age = today.getFullYear() - birthDate.getFullYear();
			const m = today.getMonth() - birthDate.getMonth();
			
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},

		
		editItem (item) {
			console.log(item)
			this.editedIndex = this.knigths.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogUp = true
		},

		deleteItem (item) {
			this.editedIndex = this.knigths.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialogDelete = true
		},

		deleteItemConfirm () {
						
			const id= this.editedItem.id
			api.deleteKnigth(id)
			.then((res) => {
				this.knigths.splice(this.editedIndex, 1)
			})
			.catch((error) => {
			console.log(error);
			});
			this.getKnigths()
			this.closeDelete()
		},
		
		
		closeUp () {
			this.dialogUp = false
			this.$nextTick(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			})
		},

		closeDelete () {
			this.dialogDelete = false
			this.$nextTick(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			})
		},		
    },
  }
</script>

  
