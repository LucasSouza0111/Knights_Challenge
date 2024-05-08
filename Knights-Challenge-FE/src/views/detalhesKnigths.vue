<template>
	
	<v-card>
			   <v-card-text>
				<v-container>
					
				  <v-row>
					<span class=" float-left" style="width: 100%;margin:2% 0%;">Dados Knigths</span>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <span class="title">Nome: </span><span>{{ knigths.name}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"	
					>
					 
					  <span class="title">Apelido: </span><span>{{ knigths.nickname}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>
					  <span class="title" >Dt.Nascimento:</span><span>{{ knigths.birthday}}</span>
					</v-col>
					
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <span class="title">strength:  </span><span>{{ atributos?.strength}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <span class="title">dexterity:  </span><span>{{ atributos?.dexterity}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>					  
					  <span class="title">constitution:  </span><span>{{ atributos?.constitution}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>
					  <span class="title">intelligence:  </span><span>{{ atributos?.intelligence}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>					 
					  <span class="title">wisdom:  </span><span>{{ atributos?.wisdom}}</span>
					</v-col>
					<v-col
					  cols="12"
					  md="2"
					  sm="6"
					>						
					  <span class="title">charisma:  </span><span>{{ atributos?.charisma}}</span>	  
					</v-col>
					<v-col
					  cols="12"
					  md="4"
					  sm="6"
					>					  
					  <span class="title">Atributo Chave:   </span><span>{{ knigths.keyAttribute}}</span>
					</v-col>
					<span class=" float-left" style="width: 100%;margin:2% 0%;">Armas</span>
						<v-col  cols="12" md="4"  sm="6">							
							<span class="title">Arma:   </span><span>{{ weapons.name}}</span>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">							
							<span class="title">Mod:   </span><span>{{ weapons.mod}}</span>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">							
							<span class="title">Attr:   </span><span>{{ weapons.attr}}</span>
						</v-col>
						<v-col  cols="12" md="4"  sm="6">							
							<span class="title">Equipped:   </span> <span>{{ weapons.equipped}}</span>
						</v-col>					
				  </v-row>
				</v-container>
			  </v-card-text>		 
  
			  <v-card-actions>
				<v-spacer></v-spacer>
				<router-link to="/knigths">
					<v-btn  class="bg-primary mx-lg-auto" >
						Voltar
					</v-btn>
				</router-link>
			  </v-card-actions>
			</v-card>
</template>

<script>
import api from "../services/api.js";

export default {	
  name: "Knigths",
  data: () => ({	
	knigths: [],
	atributos:{},
	weapons:[],
  }),

  mounted () {	
	this.getKnigth();
	
  },

  methods: {
	getKnigth(){
		const id = this.$route.params.id 
		api.getKnigth(id)
		 	.then((res) => {
				console.log( res.data)
				this.knigths = res.data
				this.atributos = res.data.attributes		
				this.weapons = res.data.weapons[0]
				
				
		      }).catch((error) => {
		  	console.log(error);
		  	});
	  },
  },
}
</script>