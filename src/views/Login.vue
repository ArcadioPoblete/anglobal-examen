<template>
<v-app>
    <div class="body-cont">
        <v-container>
            <v-row class="d-flex justify-center">

                <v-col cols="8" md="4" lg="4" xl="3">
                    <!-- Formulario -->
                    <v-card class="card-login" elevation="4">
                    <v-card-text>
                        <v-form ref="formLogin">
                            <v-row>
                                <!-- Avatar -->
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-avatar color="indigo" size="100">
                                    </v-avatar>
                                </v-col>
                                <v-col cols="10" md="10" lg="10" offset="1" offset-md="1" offset-lg="1">
                                    <!-- Input Usuario -->
                                    <v-text-field v-model="user" @keydown="validation" label="Usuario" maxlength="20"></v-text-field>
                                    <!--  Input password -->
                                    <v-text-field v-model="password" label="Password" type="password" @keydown="validation" class="pt-0 mt-0"></v-text-field>
                                </v-col>
                                <!-- Boton de ingreso -->
                                <v-col cols="8" md="10" lg="10" xl="6" offset="2" offset-md="1" offset-lg="1" offset-xl="3">
                                        <v-btn small color="success" depressed block @click="login" :disabled="actBtn">Ingresar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-container>

        <!-- Alerta -->
        <v-snackbar color="red" v-model="snackbar" top>
            {{ textAlert }}
            <v-btn color="withe" text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</v-app>
</template>

<script>
export default {
    data: () => ({
        snackbar: false,
        textAlert: '',
        actBtn: false,
        user: '',
        password: '',
        userAuth: '',
        url: '',
        dbUsers: {
            user: 'Arcadio$120',
            password: 'Isabel#300',
            authUser: false
        }
    }),
    methods: {
        //Validar el campo usuario
        validation(){
            //Longitud del campo usuario
            const inputUser = this.user.length
            //Reactivar el boton de ingresar
            if(inputUser){
                this.actBtn = false
            }
            //Alerta para  ingresar un maximo de 20 caracteres
            if (inputUser == 20){
                this.snackbar  = true //Se activa una alerta
                this.textAlert = 'Solo puedes ingresar solo 20 caracteres' //Texto de alerta
            }else{
                //Alerta desactivada
                this.snackbar  = false
            }
        },
        //Metodos de ingreso
        login(){
            //Longitud del campo usuario
            const inputUser = this.user.length

            //Validar que los campos esten correctos
            if(this.user == ''){
                this.actBtn = true
                this.snackbar  = true
                this.textAlert = 'El campo usuario es requerido'
            }else if (this.password == ''){
                this.snackbar  = true
                this.textAlert = 'El campo password es requerido'
            }else if(inputUser <= 8){
                this.snackbar  = true
                this.textAlert = 'Ingresa más de 8 caracteres'
            }else{

                this.$store.state.getUser = this.user
                this.$router.push({path: '/home'})

            }

            
            
        }
    }
}
</script>