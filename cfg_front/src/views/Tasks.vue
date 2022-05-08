<template>
  <v-container>
    <!-- Modal Add or Mod Task -->
    <modalAddOrModTask
      :overlay="showModalOverlay"
      @close="closeTask"
      @saveData="saveTask($event)"
      :show="showModalTask"
      :editedItemTask="editedItem"
    />

    <!-- Modal Archived or Delete Task -->
    <modalDelete
      :overlay="showModalOverlay"
      @close="closeDelete($event)"
      @confirm="deleteItemConfirm($event)"
      :show="showModal"
      :Data="modalDelete"
    />

    <!-- message confirmation or error Task -->
    <snackBar
      :Data="SnackBar"
      :show="showSnackBar"
      @close="showSnackBar = false"
    />

    <v-card>
      <v-card-title class="mb-2">
        Liste de Taches
        <v-btn
          class="ml-2"
          fab
          color="primary"
          x-small
          @click="showModalTask = true"
        >
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on"> mdi-plus</v-icon>
            </template>
            <span>Ajouté une tache</span>
          </v-tooltip>
        </v-btn>
        <v-spacer></v-spacer>

        <!--search bar -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          sort-by="folder.label"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        multi-sort
        :sort-by="['folder.label', 'dateLimit']"
        :sort-desc="[false, false]"
        :items="filterTasks"
        class="elevation-1"
        :loading="showOverlay"
        loading-text="Loading... Please wait"
      >
        <!-- Filter Tasks -->
        <template v-slot:body.prepend>
          <tr class="hidden-xs-only">
            <td>
              <v-select
                clearable
                v-model="searchUser"
                :items="getUsers"
                item-text="user.firstName"
                item-value="user.firstName"
                label="Utilisateur"
              ></v-select>
            </td>
            <td width="20%">
              <v-select
                clearable
                v-model="searchFolder"
                :items="getFolders"
                item-text="label"
                item-value="label"
                label="Dossier"
              ></v-select>
            </td>
            <td width="15%">
              <v-select
                clearable
                v-model="searchService"
                :items="getServices"
                item-text="name"
                item-value="name"
                label="Service"
              ></v-select>
            </td>
          </tr>

          <!--filter for mobile -->
          <tr class="d-flex flex-column">
            <td class="d-sm-none d-md-none d-lg-none d-xl-none">
              <v-select clearable :items="items" label="Utilisateur"></v-select>
            </td>
            <td class="d-sm-none d-md-none d-lg-none d-xl-none">
              <v-select clearable :items="items" label="Service"></v-select>
            </td>
            <td class="d-sm-none d-md-none d-lg-none d-xl-none">
              <v-select clearable :items="items" label="Dossier"></v-select>
            </td>
          </tr>
        </template>

        <!--Col DateLimit Task-->
        <template v-slot:item.dateLimit="{ item }">
          <v-chip
            small
            :color="ColorAndIconChipsByDate(item.dateLimit).color"
            class="font-weight-bold"
          >
            <v-icon left small>
              {{ ColorAndIconChipsByDate(item.dateLimit).icon }}
            </v-icon>
            {{ new Date(item.dateLimit).toLocaleDateString("fr") }}
          </v-chip>
        </template>

        <!--Col Service-->
        <template v-slot:item.service="{ item }">
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                :color="item.service.color"
                :title="item.service.name"
              >
                {{ item.service.icon }}
              </v-icon>
            </template>
            <span>{{ item.service.name }}</span>
          </v-tooltip>
        </template>

        <!--Col Title Task-->
        <template v-slot:item.title="{ item }">
          <v-row no-gutters>
            <v-col cols="12" class="font-weight-bold primary--text ma-1">
              {{ item.title }}
            </v-col>
            <v-col cols="12">
              <v-chip
                v-for="(user, index) in item.userTask"
                :key="index"
                small
                color="primary"
                class="ma-1"
                >{{ user.user.firstName }}</v-chip
              >
            </v-col>
          </v-row>
        </template>

        <!--Col Folder-->
        <template v-slot:item.folder.label="{ item }">
          <v-chip color="primary" class="font-weight-bold" style="width: 100%">
            <v-icon left small> mdi-folder </v-icon>
            {{ item.folder.label }}
          </v-chip>
        </template>

        <!--Col Action-->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="archivedItem(item)"
                v-bind="attrs"
                v-on="on"
                color="#B79344"
              >
                mdi-archive
              </v-icon>
            </template>
            <span>Archivé la tache</span>
          </v-tooltip>

          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mx-2"
                @click="editItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Modifié la tache</span>
          </v-tooltip>

          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="deleteItem(item)"
                v-bind="attrs"
                v-on="on"
                color="#8F0000"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Supprimé la tache</span>
          </v-tooltip>
        </template>

        <!--No Data-->
        <template v-slot:no-data>
          <v-btn color="primary" @click="initTasks()"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script src="./js/tasks">
</script>