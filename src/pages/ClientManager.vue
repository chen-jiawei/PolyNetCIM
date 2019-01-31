<template>
  <div class="page-padding">
    <my-breadcrumbs :item="items"></my-breadcrumbs>
    <div class="my-shadow my-content">
      <div class="search-bar my-shadow">
        <div class="search-item condition">
          <v-select
            :items="['ByName','By Code']"
            label="Query Condition"
            v-model="queryData.condition"
          ></v-select>
        </div>
        <div class="search-item">
          <v-text-field
            :label="queryData.condition"
          ></v-text-field>
        </div>

        <div class="search-item">
          <v-select
            :items="['aaa','bbb','cccdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd']"
            label="Country"
          ></v-select>
        </div>

        <div class="search-item">
          <v-select
            :items="statusTypeArr"
            label="Status"
            v-model="queryData.status"
          ></v-select>
        </div>

        <div class="search-item">
          <v-select
            :items="clientTypeArr"
            label="Client Type"
            v-model="queryData.clientType"
          ></v-select>
        </div>

        <div class="search-item">
          <v-btn color="info"><v-icon>search</v-icon> Search</v-btn>
        </div>
        <div class="search-item">
          <v-btn color="info" to="/client-manager-edit"><v-icon>add</v-icon> add client</v-btn>
        </div>
      </div>

      <v-data-table
        :headers="headers"
        :items="dataTable"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.cliLname }}</td>
          <td class="text-xs-left">{{ props.item.cliCode }}</td>
          <td class="text-xs-left">{{ props.item.cliMainagt }}</td>
          <td class="text-xs-left">{{ props.item.cliAddr1 }}</td>
          <td class="text-xs-left">{{ props.item.cliCty }}</td>
          <td class="text-xs-left">{{ props.item.cliSrctype }}</td>
          <td class="text-xs-left">{{ props.item.tmp_typeDesc }}</td>
          <td class="text-xs-left">{{ props.item.cliTelidd + props.item.cliTel }}</td>
          <td class="text-xs-left">{{ props.item.cliTelidd + props.item.cliFax }}</td>
          <td class="text-xs-left"><v-btn color="info"><v-icon>edit</v-icon> Edit</v-btn></td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      queryData: {
        condition: 'By Name',
        clientType: '*Whatever',
        status: '*Whatever'

      },
      clientTypeArr: [
        '*Whatever',
        'Adjuster',
        'Agent',
        'Agent Group',
        'Bank',
        'Broker',
        'Claimant',
        'Client Group',
        'Direct Account',
        'Dummy',
        'Garage',
        'H/P owner',
        'Insured',
        'Insurer',
        'Reinsurer',
        'Solicitor',
        'Staff',
        'Surver Agent',
        'Sureyor',
        'Unregistered Ag'
      ],
      statusTypeArr: [
        '*Whatever',
        'Active',
        'Close',
        'Deleted',
        'Suspend'
      ],
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Client Manager',
          disabled: true,
          href: '/client-manager'
        }
      ],
      headers: [
        {
          text: 'Long Name',
          value: 'cliLname'
        },
        {
          text: 'Client'
        },
        {
          text: 'Main Agt'
        },
        {
          text: 'Address'
        },
        {
          text: 'Country'
        },
        {
          text: 'Type'
        },
        {
          text: 'Type Desc'
        },
        {
          text: 'Tel No.'
        },
        {
          text: 'Fax No.'
        },
        {
          text: 'Options'
        }
      ],
      dataTable: [
        {
          cliCode: 'C00011',
          cliLname: 'C00011 - Long name',
          cliSname: 'C00011 - Short name',
          cliAddr1: 'addr1',
          cliAddr2: 'addr2',
          cliAddr3: 'addr3',
          cliAddr4: 'addr4',
          cliCty: 'MAC',
          cliZip: '',
          cliType: 'C',
          cliGroup: ' ',
          cliTelidd: '853',
          cliTel: '123456789',
          cliFaxidd: ' ',
          cliFax: ' ',
          cliTlxidd: ' ',
          cliTlx: ''
        },
        {
          cliCode: 'C00011',
          cliLname: 'C00011 - Long name',
          cliSname: 'C00011 - Short name',
          cliAddr1: 'addr1',
          cliAddr2: 'addr2',
          cliAddr3: 'addr3',
          cliAddr4: 'addr4',
          cliCty: 'MAC',
          cliZip: '',
          cliType: 'C',
          cliGroup: ' ',
          cliTelidd: '853',
          cliTel: '123456789',
          cliFaxidd: ' ',
          cliFax: ' ',
          cliTlxidd: ' ',
          cliTlx: ''
        },
        {
          cliCode: 'C00011',
          cliLname: 'C00011 - Long name',
          cliSname: 'C00011 - Short name',
          cliAddr1: 'addr1',
          cliAddr2: 'addr2',
          cliAddr3: 'addr3',
          cliAddr4: 'addr4',
          cliCty: 'MAC',
          cliZip: '',
          cliType: 'C',
          cliGroup: ' ',
          cliTelidd: '853',
          cliTel: '123456789',
          cliFaxidd: ' ',
          cliFax: ' ',
          cliTlxidd: ' ',
          cliTlx: ''
        },
        {
          cliCode: 'C00011',
          cliLname: 'C00011 - Long name',
          cliSname: 'C00011 - Short name',
          cliAddr1: 'addr1',
          cliAddr2: 'addr2',
          cliAddr3: 'addr3',
          cliAddr4: 'addr4',
          cliCty: 'MAC',
          cliZip: '',
          cliType: 'C',
          cliGroup: ' ',
          cliTelidd: '853',
          cliTel: '123456789',
          cliFaxidd: ' ',
          cliFax: ' ',
          cliTlxidd: ' ',
          cliTlx: ''
        },
        {
          cliCode: 'C00011',
          cliLname: 'C00011 - Long name',
          cliSname: 'C00011 - Short name',
          cliAddr1: 'addr1',
          cliAddr2: 'addr2',
          cliAddr3: 'addr3',
          cliAddr4: 'addr4',
          cliCty: 'MAC',
          cliZip: '',
          cliType: 'C',
          cliGroup: ' ',
          cliTelidd: '853',
          cliTel: '123456789',
          cliFaxidd: ' ',
          cliFax: ' ',
          cliTlxidd: ' ',
          cliTlx: ''
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.data-icon {
  float: left;
  margin-right: 5px;
}
.search-bar {
  padding: 10px 5px;
  overflow: hidden;
  margin-bottom: 10px;
  background: #FFF;
  .search-item {
    float: left;
    margin-right: 20px;
    max-width: 200px;
    overflow:hidden;
  }
}
</style>

