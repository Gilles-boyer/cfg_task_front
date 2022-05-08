<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <overlay :show="overlay" />
    <v-card>
      <v-card-title style="background-color: #04153b">
        <v-icon left class="white--text">{{ formTitle.icon }}</v-icon>
        <span class="text-h5 white--text"> {{ formTitle.title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <!-- titre task -->
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.title"
                  :rules="[rules.required, rules.min3, rules.string]"
                  label="Titre de la tache"
                ></v-text-field>
              </v-col>

              <!-- choix service -->
              <v-col cols="12">
                <v-select
                  v-model="editedItem.service"
                  :items="getServices"
                  :rules="[rules.object, rules.service]"
                  item-text="name"
                  item-value="_id"
                  return-object
                  label="Choisir un service"
                ></v-select>
              </v-col>

              <!-- Date Limit -->
              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Choisir une date limite"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="editedItem.dateLimit"
                    :rule="[rules.required, rules.date]"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- select folder -->
              <v-col cols="12">
                <v-select
                  v-model="editedItem.folder"
                  :rules="[rules.object, rules.folder]"
                  item-value="_id"
                  :items="getFolders"
                  item-text="label"
                  return-object
                  label="Choisir un dossier"
                ></v-select>
              </v-col>

              <!-- select users -->
              <v-col cols="12">
                <v-select
                  v-model="editedItem.userTask"
                  :rules="[rules.users]"
                  :items="getUsers"
                  item-value="user._id"
                  item-text="user.firstName"
                  return-object
                  attach
                  chips
                  label="Choisir un utilisateur"
                  multiple
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src="./js/formAddTask">
</script>