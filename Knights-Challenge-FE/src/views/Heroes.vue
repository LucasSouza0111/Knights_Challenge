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
		  <v-toolbar-title>Heroes</v-toolbar-title>
		  <v-divider
			class="mx-4"
			inset
			vertical
		  ></v-divider>	
		</v-toolbar>
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
      ],
      knigths: [],
      editedIndex: -1,
      editedItem: {
        
      },
      defaultItem: {
        
      },
    }),
    mounted () {
	  this.getHeroes();
    },

    methods: {
		getHeroes() {
			api.getHeroesAll()
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
	
    },
  }
</script>

  
