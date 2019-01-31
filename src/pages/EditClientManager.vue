<template>
  <div class="page-padding">
    <my-breadcrumbs :item="items"></my-breadcrumbs>
    <div class="my-shadow my-content">
      <v-tabs
        v-model="active"
        slider-color="#1976D2"
      >
        <v-tab ripple>
          Client
        </v-tab>
        <v-tab ripple>
          Attentions
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="client-info my-vuetify-css">
              <!-- table1 -->
              <!-- 表单第一行 -->
              <div class="clear">
                <div class="info-item">
                  <div class="info-item-name">Client Code</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">Client Type</div>
                  <div class="info-item-input">
                    <v-select
                      :items="['aaa','bbb','ccc']"
                      label="please select"
                      solo
                    ></v-select>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">Status</div>
                  <div class="info-item-input">
                    <v-select
                      :items="['aaa','bbb','ccc']"
                      label="please select"
                      solo
                    ></v-select>
                  </div>
                </div>
              </div>
              <!-- 表单第二行 -->
              <div class="clear">
                <div class="info-item">
                  <div class="info-item-name">Cross Ref 1</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">Cross Ref 2</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">Cross Ref 3</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <!-- 表单flex部分 -->
              <v-container grid-list-md text-xs-center class="personal-data">
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-card class="affiliation pd10">
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Long Name</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Short Name</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Chinese</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Address1</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Address2</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Address3</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Address4</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Country</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">District</div></v-flex>
                                  <v-flex xs8><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Office Tel No.</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                  <v-flex xs4><v-text-field solo></v-text-field></v-flex>
                                  <v-flex xs8><v-text-field solo></v-text-field></v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">Res. Tel No.</div></v-flex>
                                  <v-flex xs8>
                                    <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                      <v-flex xs4><v-text-field solo></v-text-field></v-flex>
                                      <v-flex xs8><v-text-field solo></v-text-field></v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Fax No.</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                  <v-flex xs4><v-text-field solo></v-text-field></v-flex>
                                  <v-flex xs8><v-text-field solo></v-text-field></v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">Mobile</div></v-flex>
                                  <v-flex xs8>
                                    <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                      <v-flex xs4><v-text-field solo></v-text-field></v-flex>
                                      <v-flex xs8><v-text-field solo></v-text-field></v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Email</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Nature</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <div class="item-input">
                                  <v-select
                                    :items="NatureArr"
                                  ></v-select>
                                </div>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">Occupation</div></v-flex>
                                  <v-flex xs8>
                                    <div class="item-input">
                                      <v-select
                                        :items="occupationArr"
                                      ></v-select>
                                    </div></v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">ID Card</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select :items="countryArr"></v-select>
                              </v-flex>
                              <v-flex xs4>
                                <v-text-field></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"></div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select :items="countryArr"></v-select>
                              </v-flex>
                              <v-flex xs4>
                                <v-text-field></v-text-field>
                              </v-flex>
                              <v-flex xs4>
                                <div class="item-input">
                                  <v-checkbox label="Foreign Resident" v-model="checkbox1"></v-checkbox>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">Sex</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs2>
                                <v-select :items="['man','woman']"></v-select>
                              </v-flex>
                              <v-flex xs6>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">Date of Birth</div></v-flex>
                                  <v-flex xs8>
                                    <v-menu
                                      ref="menu"
                                      v-model="menu"
                                      :return-value.sync="date"
                                      lazy
                                      offset-y
                                      full-width
                                      min-width="290px"
                                    >
                                      <v-text-field
                                        slot="activator"
                                        v-model="date"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs4>
                                <div class="item-input">
                                  
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      
                      
                    </v-card>
                  </v-flex>

                  <v-flex xs4>
                    <v-card>
                      <v-card-text class="px-0">
                        <!-- flex4 -->
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- table2 -->

            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      ckeckbox1: false,
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Client Manager',
          disabled: false,
          href: '/client-manager'
        },
        {
          text: 'Edit',
          disabled: true,
          href: '/client-manager-edit'
        }
      ],
      NatureArr: ['Company','Individual'],
      occupationArr: ['Othres'],
      countryArr: ['Macau']
    }
  }
}
</script>
<style lang="less" scoped>
.clear {
  overflow: hidden;
}
.info-item {
  float: left;
  overflow: hidden;
  margin-right: 30px;
  .info-item-name {
    float: left;
    line-height: 32px;
    margin-right: 5px;
    min-width: 80px;
    text-align: right;
  }
  .info-item-input {
    float: left;
    min-width: 230px;
    
    
  }

}
.nofloat {
  float: none;
}
.item-left-name {
  text-align: left;
  line-height: 32px;
  height: 62px;
}
.affiliation {
  .item {
    overflow: hidden;
    .item-name {
      float: left;
      line-height: 32px;
    }
    .item-input {
      float: left;
      width: 100%;
    }
  }
}
.pd10 {
  padding: 10px;
}
</style>
<style>
.my-vuetify-css .v-input__slot {
  border: 1px solid #eeeeee;
}
.my-vuetify-css .v-input__control {
  min-height: 32px !important;
}
.personal-data .v-select__slot {
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
}
.personal-data .v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.personal-data .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
</style>
