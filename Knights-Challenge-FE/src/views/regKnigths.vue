<template>
	<v-card>
			   <v-card-text>
				<v-container>
					
				  <v-row>
					<span class=" float-left" style="width: 100%;">Dados Knigths</span>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.name"
						label="Nome"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"	
					>
					  <v-text-field variant="underlined"
						v-model="createItem.nickname"
						label="Apelido"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.birthday"
						label="Dt.Nascimento"
					  ></v-text-field>
					</v-col>
					
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.strength"
						label="strength"
						type="number"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.dexterity"
						label="dexterity"
						type="number"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.constitution"
						label="constitution"
						type="number"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.intelligence"
						label="intelligence"
						type="number"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.wisdom"
						label="wisdom"
						type="number"
					  ></v-text-field>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <v-text-field variant="underlined"
						v-model="createItem.attributes.charisma"
						label="charisma"
						type="number"
					  ></v-text-field>					  
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <v-select variant="underlined"
						v-model="createItem.keyAttribute"
						label="Atributo Chave"
						:items="['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']"
							
					  ></v-select>
					</v-col>
					<span class=" float-left" style="width: 100%;">Armas</span>
						<v-col  cols="12" md="4"  sm="6">
							<v-text-field variant="underlined"
								v-model="weapons.name"
								label="Arma"
							></v-text-field>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">
							<v-text-field variant="underlined"
								v-model="weapons.mod"
								label="Mod"
							></v-text-field>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">
							<v-select variant="underlined"
								v-model="weapons.attr"
								label="Attr"
								:items="['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']"
							></v-select>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">
							<v-checkbox variant="underlined"
								v-model="weapons.equipped"
								label="Equipped?"								
							></v-checkbox>
						</v-col>					
				  </v-row>
				</v-container>
			  </v-card-text>
			  <v-dialog v-model="dialogSucess" max-width="70%">
				<v-card>
				<v-card-title class="text-h5 text-center">Cadastro reslizado com sucesso. Deseja cadastrar mais um Knigths?</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue-darken-1" variant="text" @click="closeCad">Sim</v-btn>
					<router-link to="/"><v-btn color="blue-darken-1" variant="text" >Não</v-btn></router-link>
					
					<v-spacer></v-spacer>
				</v-card-actions>
				</v-card>
			</v-dialog>
  
			  <v-card-actions>
				<v-spacer></v-spacer>
				<router-link to="/">
					<v-btn  class="bg-primary mx-lg-auto"  @click="closeCad">
						Cancel
					</v-btn>
				</router-link>
				
				<v-btn	class="bg-primary mx-lg-auto"
				  @click="postKnight"
				>
				  Save
				</v-btn>
			  </v-card-actions>
			</v-card>
</template>

<script>
import api from "../services/api.js";

export default {	
  name: "Knigths",
  data: () => ({	
	knigths: [],
	dialogSucess: false,
	editedIndex: -1,
	weapons:{name: '', mod: '', attr: '', equipped: false},
	createItem: {
	  
			  "name": "", 
			  "nickname": "", 
			  "birthday": "", 
			  "weapons": [ 
				  { 
				  "name": "sword", 
				  "mod": 3, 
				  "attr": " strength", 
				  "equipped": false 
				  } , 
			  ], 
			  "attributes": { 
				  "strength": 0, 
				  "dexterity": 0, 
				  "constitution": 0, 
				  "intelligence": 0, 
				  "wisdom": 0, 
				  "charisma": 0
			  },
			  "keyAttribute": "strength" 
		  
	  
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
	dialogSucess (val) {
		  val || this.closeCad()
	  },
  },

  mounted () {
	//this.initialize()
	//this.getKnigths();
  },

  methods: {

	  cadItem () {
		  //this.createItem = Object.assign({}, item)
		  this.dialogSucess = true
	  },

	  closeCad () {
		  this.dialogSucess = false
	  },
	  postKnight(){
		  const data =  this.createItem  
		  const weapons =  this.weapons 
		  data.weapons = weapons 
		  api.postKnight(data)
		  	.then((response) => {
		       this.cadItem()
		      }).catch((error) => {
		  	console.log(error);
		  	});
	  },
  },
}
</script>