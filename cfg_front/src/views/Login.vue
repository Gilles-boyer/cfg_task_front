<template>
  <v-container
    class="Login"
    style="background: #04153b; padding: 0"
    fill-height
    fluid
  >
    <v-row justify="center" no-gutters>
      <v-col class="col-12" align="center">
        <v-img src="../assets/logo.png" height="200px" width="200"></v-img>
      </v-col>
      <v-col
        class="hidden-xs-only"
        style="border-bottom: 8px solid #a09f9f"
        xl="4"
        md="4"
        sm="2"
        cols="1"
      >
      </v-col>
      <v-col align="center" style="padding: 0" xl="4" md="4" sm="8" cols="12">
        <v-card
          flat
          color="secondary"
          style="border-radius: 80px 0px"
          class="py-4"
        >
          <v-form
            class="white--text"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-text>
              <v-row justify="center" align="center" no-gutters>
                <v-col cols="11">
                  <v-text-field
                    v-model="email"
                    solo
                    dense
                    rounded
                    :rules="[rules.required, rules.email]"
                    label="Identifiant"
                    required
                    flat
                  ></v-text-field>
                </v-col>
                <v-col cols="11">
                  <v-text-field
                    flat
                    v-model="password"
                    dense
                    rounded
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.password]"
                    :type="show4 ? 'text' : 'password'"
                    label="Password"
                    solo
                    error
                    @click:append="show4 = !show4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn :disabled="!valid" color="primary"> Valider </v-btn>
              <v-btn color="primary"> Reset password </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col
        class="hidden-xs-only"
        xl="4"
        md="4"
        sm="2"
        cols="1"
        style="border-top: 8px solid #a09f9f"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./js/login">
</script>
