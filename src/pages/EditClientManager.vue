<template>
  <div> 
    <!-- <embed :src="testIMG" type="application/pdf" width="100%" height="100%" style="position:fixed;top:0;left:0;z-index:99999999;" v-if="testIMG !== ''"> -->
    <!-- <pdf :src="testIMG" style="width:50%;height:50%;position:fixed;top:0;left:0;z-index:99999999;" v-if="testIMG !== ''"></pdf> -->
    <v-alert class="my-alert" color="#FB8C00" :value="showErrorMsg" type="warning" transition="scale-transition">
      {{errorMsg}}
    </v-alert>
    <v-alert class="my-alert" color="#4CAF50" :value="showSuccessMsg" type="success" transition="scale-transition">
      {{successMsg}}
    </v-alert>
    <v-alert class="my-alert" color="#4CAF50" :value="EFSsubmitSuccess" type="success" transition="scale-transition">
      {{`Successfully uploaded ${successNumber} file`}}
    </v-alert>
    <my-breadcrumbs :item="items"></my-breadcrumbs>
    <div class="my-content">
      <v-tabs
        slider-color="#1976D2"
      >
        <v-tab ripple>
          {{$t('Client')}}
        </v-tab>
        <v-tab ripple>
          {{$t('Attentions')}}
        </v-tab>
        <!--  ==================  client  =============== -->
        <v-tab-item style="background: yellow;height: auto;width:100%;">
          <v-card flat>
            <div class="my-vuetify-css" style="width: 100%;height:140px;background: #fff;margin-bottom: 10px;padding: 10px 20px;">
              <!-- 表单第一行 -->
              <div class="clear">
                <div class="info-item">
                  <div class="info-item-name"><i class="redstar">*</i>{{$t('ClientCode')}}</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                      v-model="clientForm.cliCode"
                      :rules="[verify,max6]" 
                      required
                      :error="formValid.cliCode"
                      validate-on-blur
                      :disabled="forbidChange"
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name"><i class="redstar">*</i>{{$t('ClientType')}}</div>
                  <div class="info-item-input">
                    <v-select
                      :items="clientTypes"
                      item-text="label"
                      item-value="value"
                      v-model="clientForm.cliType"
                      :rules="[verify]" 
                      required
                      validate-on-blur
                      :error="formValid.cliType"
                      solo
                    ></v-select>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name"><i class="redstar">*</i>{{$t('Status')}}</div>
                  <div class="info-item-input">
                    <v-select
                      :items="statusList"
                      item-text="label"
                      item-value="value"
                      v-model="clientForm.cliSt"
                      :rules="[verify]" 
                      required
                      validate-on-blur
                      :error="formValid.cliSt"
                      solo
                    ></v-select>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-item-input">
                    <!--       暂时不要        -->
                  </div>
                </div>
                <div class="info-item item-checkbox">
                  <div class="info-item-input">
                    <v-checkbox 
                      label="中資機構" 
                      class="no-border" 
                      true-value="Y"
                      false-value="N"
                      v-model="clientForm.cliArea"
                    ></v-checkbox>
                  </div>
                </div>
              </div>
              <!-- 表单第二行 -->
              <div class="clear">
                <div class="info-item">
                  <div class="info-item-name">{{$t('CrossRef1')}}</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                      v-model="clientForm.cliXref"
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">{{$t('CrossRef2')}}</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-item-name">{{$t('CrossRef3')}}</div>
                  <div class="info-item-input">
                    <v-text-field
                      solo
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
            <v-card-text class="client-info my-vuetify-css" style="width: 100%;height:auto;background: rgb(242,248,251);padding: none;">
              <!-- table1 -->
              <!-- 表单flex部分 -->
              <v-container grid-list-md text-xs-center class="personal-data">
                <v-layout row wrap>
                  <!-- 表单左边-占8份 -->
                  <v-flex xs8>
                    <v-card class="affiliation pd10" style="background: #fff;">
                      <div class="item" >
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('LongName')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field 
                                solo v-model="clientForm.cliLname" 
                                :rules="[verify]" 
                                required 
                                validate-on-blur
                                :error="formValid.cliLname"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('ShortName')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field 
                                solo v-model="clientForm.cliSname" 
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliSname"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">{{$t('Chinese')}}</div></v-flex>
                          <v-flex xs10><div class="item-input"><v-text-field solo v-model="clientForm.cliCname"></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Address1')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field 
                                solo 
                                v-model="clientForm.cliAddr1" 
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliAddr1"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Address2')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field 
                                solo v-model="clientForm.cliAddr2"
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliAddr2"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Address3')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field solo 
                                v-model="clientForm.cliAddr3"
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliAddr3"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Address4')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field solo 
                                v-model="clientForm.cliAddr4"
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliAddr4"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Country')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <div class="item-input">
                                  <v-select
                                    :items="countrys"
                                    item-text="label"
                                    item-value="value"
                                    v-model="clientForm.cliCty"
                                    :rules="[verify]" 
                                    required
                                    validate-on-blur
                                    :error="formValid.cliCty"
                                  ></v-select>
                                </div>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name"><i class="redstar">*</i>{{$t('District')}}</div></v-flex>
                                  <v-flex xs8>
                                    <div class="item-input">
                                      <v-text-field 
                                        solo 
                                        v-model="clientForm.cliZip" 
                                        :rules="[verify]" 
                                        required
                                        validate-on-blur
                                        :error="formValid.cliZip"
                                      ></v-text-field>
                                    </div>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('OfficeTelNo.')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                  <v-flex xs4>
                                    <v-text-field solo v-model="clientForm.cliTelidd" :rules="[verify,max5]" required validate-on-blur :error="formValid.cliTelidd"></v-text-field>
                                  </v-flex>
                                  <v-flex xs8>
                                    <v-text-field solo v-model="clientForm.cliTel" :rules="[verify]" required validate-on-blur :error="formValid.cliTel"></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name"><i class="redstar">*</i>{{$t('Res.TelNo.')}}</div></v-flex>
                                  <v-flex xs8>
                                    <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                      <v-flex xs4>
                                        <v-text-field solo v-model="clientForm.cliResidd" :rules="[verify,max5]" required validate-on-blur :error="formValid.cliResidd"></v-text-field>
                                      </v-flex>
                                      <v-flex xs8>
                                        <v-text-field solo v-model="clientForm.cliRestel" :rules="[verify]" required validate-on-blur :error="formValid.cliRestel"></v-text-field>
                                      </v-flex>
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
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('FaxNo.')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                  <v-flex xs4>
                                    <v-text-field solo v-model="clientForm.cliFaxidd" :rules="[verify,max5]" required validate-on-blur :error="formValid.cliFaxidd"></v-text-field>
                                  </v-flex>
                                  <v-flex xs8>
                                    <v-text-field solo v-model="clientForm.cliFax" :rules="[verify]" required validate-on-blur :error="formValid.cliFax"></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">{{$t('Mobile')}}</div></v-flex>
                                  <v-flex xs8>
                                    <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                      <v-flex xs4><v-text-field solo v-model="clientForm.cliMobidd"></v-text-field></v-flex>
                                      <v-flex xs8><v-text-field solo v-model="clientForm.cliMobtel"></v-text-field></v-flex>
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
                          <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Email')}}</div></v-flex>
                          <v-flex xs10>
                            <div class="item-input">
                              <v-text-field solo 
                                v-model="clientForm.cliEmail"
                                :rules="[verify]" 
                                required
                                validate-on-blur
                                :error="formValid.cliEmail"
                              ></v-text-field>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">{{$t('Nature')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                              <v-flex xs4>
                                <div class="item-input">
                                  <v-select
                                    :items="NatureArr"
                                    item-text="label"
                                    item-value="value"
                                    v-model="clientForm.cliNat"
                                  ></v-select>
                                </div>
                              </v-flex>
                              <v-flex xs7>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name">{{$t('Occupation')}}</div></v-flex>
                                  <v-flex xs8>
                                    <div class="item-input">
                                      <v-select
                                        :items="occupations"
                                        item-text="label"
                                        item-value="value"
                                        v-model="clientForm.cliOccup"
                                      ></v-select>
                                    </div></v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item" v-if="clientForm.cliNat === 'C'">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">{{$t('B.R.NO.')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-text-field v-model="clientForm.cliBrn"></v-text-field>
                              </v-flex>
                              <v-flex xs4>
                                <div class="item-input f-right">
                                  <v-checkbox 
                                    label="Foreign Resident" 
                                    class="no-border" 
                                    true-value="Y"
                                    false-value="N"
                                    v-model="clientForm.cliForres"
                                  ></v-checkbox>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item" v-if="clientForm.cliNat === 'A'">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">{{$t('IDCard')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select 
                                  :items="idCards"
                                  item-text="label"
                                  item-value="value"
                                  v-model="clientForm.cliPIdtype"
                                ></v-select>
                              </v-flex>
                              <v-flex xs4>
                                <v-text-field v-model="clientForm.cliPIdcard"></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item" v-if="clientForm.cliNat === 'A'">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name"></div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select 
                                  :items="idCards"
                                  item-text="label"
                                  item-value="value"
                                ></v-select>
                              </v-flex>
                              <v-flex xs4>
                                <v-text-field></v-text-field>
                              </v-flex>
                              <v-flex xs4>
                                <div class="item-input f-right">
                                  <v-checkbox 
                                    label="Foreign Resident" 
                                    class="no-border" 
                                    true-value="Y"
                                    false-value="N"
                                    v-model="clientForm.cliForres"
                                  ></v-checkbox>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item" v-if="clientForm.cliNat === 'A'">
                        <v-layout row wrap>
                          <v-flex xs2><div class="item-name">{{$t('Sex')}}</div></v-flex>
                          <v-flex xs10>
                            <v-layout row wrap>
                              <v-flex xs2>
                                <v-select
                                  :items="sexList"
                                  item-text="label"
                                  item-value="value"
                                  v-model="clientForm.cliPSex"
                                ></v-select>
                              </v-flex>
                              <v-flex xs6>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name f-right">{{$t('DateofBirth')}}</div></v-flex>
                                  <v-flex xs8>
                                  <!-- =========================================== -->
                                    <v-menu
                                      ref="menu"
                                      lazy
                                      offset-y
                                      full-width
                                    >
                                      <v-text-field
                                        slot="activator"
                                        v-model="clientForm.cliPBirth"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="clientForm.cliPBirth" no-title scrollable>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs4>
                                <v-layout row wrap>
                                  <v-flex xs4><div class="item-name f-right">{{$t('Marital')}}</div></v-flex>
                                  <v-flex xs8>
                                    <v-select 
                                      :items="maritals"
                                      item-text="label"
                                      item-value="value"
                                      v-model="clientForm.cliMar"
                                    ></v-select>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="area-border">
                        <div class="title" style="color: rgb(25,118,210);">{{$t('BankA/C')}}Bank A/C</div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('BankName')}}</div></v-flex>
                            <v-flex xs10>
                              <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                <v-flex xs4>
                                  <div class="item-input">
                                    <v-select 
                                      :items="banks"
                                      item-text="label"
                                      item-value="value"
                                      
                                    ></v-select>
                                  </div>
                                </v-flex>
                                <v-flex xs7>
                                  <v-layout row wrap>
                                    <v-flex xs4><div class="item-name">{{$t('BankA/C')}}</div></v-flex>
                                    <v-flex xs8><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name">{{$t('A/CName')}}</div></v-flex>
                            <v-flex xs10>
                              <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                <v-flex xs4><div class="item-input"><v-select :items="[]"></v-select></div></v-flex>
                                <v-flex xs7>
                                  <v-layout row wrap>
                                    <v-flex xs4><div class="item-name">{{$t('PaymentMethod')}}</div></v-flex>
                                    <v-flex xs8>
                                      <div class="item-input">
                                        <v-select 
                                          :items="payments" 
                                          v-model="clientForm.cliPaymthd"
                                          item-text="label"
                                          item-value="value"
                                        ></v-select>
                                      </div>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </div>
                      </div>
                      <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name">{{$t('Joinuson')}}</div></v-flex>
                            <v-flex xs10>
                              <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                <v-flex xs4>
                                  <div class="item-input">
                                    <v-menu
                                      ref="menu2"
                                      lazy
                                      offset-y
                                      full-width
                                    >
                                      <v-text-field
                                        slot="activator"
                                        v-model="clientForm.cliJoindate"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="clientForm.cliJoindate" no-title scrollable>
                                      </v-date-picker>
                                    </v-menu>
                                  </div>
                                </v-flex>
                                <v-flex xs7>
                                  <v-layout row wrap>
                                    <v-flex xs4><div class="item-name">{{$t('Contact')}}</div></v-flex>
                                    <v-flex xs8><div class="item-input"><v-select :items="[]"></v-select></div></v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name">{{$t('Group')}}</div></v-flex>
                            <v-flex xs10>
                              <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                <v-flex xs4>
                                  <div class="item-input"><v-select :items="[]" v-model="clientForm.cliGroup"></v-select></div>
                                </v-flex>
                                <v-flex xs7>
                                  <v-layout row wrap>
                                    <v-flex xs4><div class="item-name">{{$t('Replacedby')}}</div></v-flex>
                                    <v-flex xs8><div class="item-input"><v-text-field solo v-model="clientForm.cliRplcby"></v-text-field></div></v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name">{{$t('O/SBalancesContact')}}</div></v-flex>
                            <v-flex xs10>
                              <v-layout row wrap grid-list-md text-xs-center justify-space-between>
                                <v-flex xs4><div class="item-input"><v-select :items="['C.N.翻譯顧問有限公司']"></v-select></div></v-flex>
                                <v-flex xs7>
                                  <v-layout row wrap>
                                    <v-flex xs4><div class="item-name">{{$t('AllowedAgent')}}</div></v-flex>
                                    <v-flex xs8><div class="item-input"><v-text-field solo v-model="clientForm.cliAlwagt"></v-text-field></div></v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name">{{$t('Remarks')}}</div></v-flex>
                            <v-flex xs10><div class="item-input"><v-text-field solo></v-text-field></div></v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs2><div class="item-name"><i class="redstar">*</i>{{$t('Note')}}</div></v-flex>
                            <v-flex xs10>
                              <div class="item-input">
                                <v-text-field solo v-model="clientForm.cliNote" :rules="[verify]" required validate-on-blur :error="formValid.cliNote"></v-text-field>
                              </div>
                            </v-flex>
                          </v-layout>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs3>{{$t('CreatedOn')}} <span class="weight">{{clientForm.cliCdate | formatDate}}</span></v-flex>
                            <v-flex xs3>{{$t('by')}} <span class="weight">{{clientForm.cliCuser}}</span></v-flex>
                            <v-flex xs3>{{$t('AmendedOn')}} <span class="weight">{{clientForm.cliAdate | formatDate}}</span></v-flex>
                            <v-flex xs3>{{$t('by')}} <span class="weight">{{clientForm.cliAuser}}</span></v-flex>
                          </v-layout>
                        </div>
                      
                      
                    </v-card>
                  </v-flex>

                  <!-- 表单右边-占4份 -->
                  <v-flex xs4>
                    <v-card  class="affiliation pd10 right-option" style="background: #fff;">
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs3><div class="item-name">{{$t('CreditDays')}}</div></v-flex>
                          <v-flex xs9><div class="item-input"><v-text-field v-model="clientForm.cliCrdays" solo hide-details></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs3><div class="item-name">{{$t('CreditLimit')}}</div></v-flex>
                          <v-flex xs9>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select
                                  :items="[]"
                                  hide-details
                                ></v-select>
                              </v-flex>
                              <v-flex xs8>
                                <div class="item-input"><v-text-field solo hide-details></v-text-field></div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs3><div class="item-name">{{$t('GuaranteeLimit')}}</div></v-flex>
                          <v-flex xs9>
                            <v-layout row wrap>
                              <v-flex xs4>
                                <v-select
                                  :items="[]"
                                  hide-details
                                ></v-select>
                              </v-flex>
                              <v-flex xs8>
                                <div class="item-input"><v-text-field solo hide-details></v-text-field></div>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs3><div class="item-name">{{$t('ContractNo')}}</div></v-flex>
                          <v-flex xs9><div class="item-input"><v-text-field solo hide-details></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs3><div class="item-name">{{$t('AMCMReg.No.')}}</div></v-flex>
                          <v-flex xs9><div class="item-input"><v-text-field solo hide-details></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs8><div class="item-name">{{$t('VehicleAgeLoadingTable')}}</div></v-flex>
                          <v-flex xs4>
                            <div class="item-input">
                              <v-select
                                :items="['01','02','03']"
                              ></v-select>
                            </div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <!-- 打印设置 -->
                      <div class="area-border">
                        <div class="title" style="color: rgb(25,118,210);">{{$t('PrintOption')}}</div>
                        <div class="item">
                          <v-checkbox :label="$t('PrintDebitNoteForAgent')" class="no-border" hide-details></v-checkbox>
                          <v-checkbox :label="$t('NotPrintReceipt')" class="no-border" hide-details></v-checkbox>
                          <v-checkbox :label="$t('PrintStaternentOfAccount')" class="no-border" hide-details></v-checkbox>
                        </div>
                        <div class="item">
                          <v-layout row wrap>
                            <v-flex xs6><div class="item-name">{{$t('StatementFormat')}}</div></v-flex>
                            <v-flex xs6>
                              <v-select
                                  :items="[]"
                                  hide-details
                                ></v-select>
                            </v-flex>
                          </v-layout>
                        </div>
                      </div>

                      <!-- 文件操作 -->
                      <div class="file-opt">
                        <v-layout row wrap>
                          <v-flex xs6>
                            <v-icon x-large>description</v-icon>
                            <div>{{$t('Remarks')}}</div>
                          </v-flex>
                          <v-flex xs6>
                            <v-icon x-large color="#3486D7">description</v-icon>
                            <div>{{$t('ReminderRemarks')}}</div>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap class="btn-group">
                          <v-flex xs12><v-btn block color="rgb(37,163,233)">{{$t('StatisticsCode')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(229,113,49)">{{$t('CommissionTerms')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(255,205,85)">{{$t('InsuredU/WInquiry')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(150,200,91)">{{$t('StatusHistory')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(149,140,96)">{{$t('Member')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(131,108,159)">{{$t('Group')}}</v-btn></v-flex>
                          <v-flex xs12><v-btn block color="rgb(184,99,117)" @click="openEFSList">{{$t('EFS')}}</v-btn></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-checkbox 
                          :label="$t('ApplyRoundinginDebitNote')" 
                          class="no-border" 
                          true-value="Y"
                          false-value="N"
                          v-model="clientForm.cliRndgDn" 
                          hide-details
                        ></v-checkbox>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs6><div class="item-name">{{$t('BankReferforAgent')}}</div></v-flex>
                          <v-flex xs6><div class="item-input"><v-text-field v-model="clientForm.cliBankagt" solo hide-details></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs6><div class="item-name">{{$t('iAgencyStatus')}}</div></v-flex>
                          <v-flex xs6><div class="item-input"><v-text-field v-model="clientForm.cliIagstatus" solo hide-details></v-text-field></div></v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs6><div class="item-name">{{$t('iAgencyLoginID')}}</div></v-flex>
                          <v-flex xs6>
                            <div class="item-input"><v-text-field v-model="clientForm.cliLoginid" solo hide-details></v-text-field></div>
                          </v-flex>
                        </v-layout>
                      </div>
                      <div class="item">
                        <v-layout row wrap>
                          <v-flex xs6><div class="item-name">{{$t('SyncProfileDate')}}</div></v-flex>
                          <v-flex xs6>
                            <v-menu
                              ref="menu"
                              lazy
                              offset-y
                              full-width
                            >
                              <v-text-field
                                slot="activator"
                                v-model="clientForm.cliSyncprofiledate"
                                readonly
                              ></v-text-field>
                              <v-date-picker v-model="clientForm.cliSyncprofiledate" no-title scrollable>
                              </v-date-picker>
                            </v-menu>
                            
                          </v-flex>
                        </v-layout>
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>
                <div class="server-btn" style="margin: 0 auto;width: 100%;">
                  <v-btn color="rgb(29,118,208)" style="width: 310px;color: #fff;" :loading="isLoading" :disabled="!formValid" @click="submitClientInfo">{{$t('Save')}}</v-btn>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- ===============  Attentions列表  ================= -->
        <v-tab-item>
          <v-card flat>
            <div>
              <v-btn class="f-right" color="info" @click="addAttentions"><v-icon>add</v-icon> {{$t('Add')}}</v-btn>
            </div>
            <v-data-table
              hide-actions
              :headers="headers"
              :items="attentionsData"
              class="attentions-table"
              :loading="attentionLoading"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.claItem }}</td>
                <td class="text-xs-left">{{ props.item.claName }}</td>
                <td class="text-xs-left">{{ props.item.claStaff }}</td>
                <td class="text-xs-left">{{ props.item.claAgtref }}</td>
                <td class="text-xs-left">{{ props.item.claTitle }}</td>
                <td class="text-xs-left">{{ props.item.claTelidd + props.item.claTel }}</td>
                <td class="text-xs-left">{{ props.item.claFaxidd + props.item.claFax }}</td>
                <td class="text-xs-left">
                  <v-btn 
                    color="info" 
                    small 
                    @click="editAttentions(clientForm.cliCode, props.item.claItem)"
                  >
                    <v-icon small>edit</v-icon> {{$t('Edit')}}
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>

    <!-- =============  新增/编辑Attentions  ============== -->
    <v-dialog v-model="dialog" scrollable persistent max-width="1000">
      <v-card>
        <v-card-text>
          <div class="dialog-content">
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('ContactCode')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field 
                      solo 
                      readonly
                      v-model="attentionsForm.claItem"
                    ></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('Name')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field 
                      solo 
                      v-model="attentionsForm.claName"
                      :rules="[verify]" 
                      :error="attentionsValid.claName"
                      required
                      validate-on-blur
                    ></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('JobTitle')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs4>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claTitle"
                          :rules="[verify]" 
                          :error="attentionsValid.claTitle"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs7>
                      <v-layout row wrap>
                        <v-flex xs5>
                          <div class="attention-item-name"><i class="redstar">*</i>{{$t('FirstName')}}</div>
                        </v-flex>
                        <v-flex xs7>
                          <div class="attention-item-input">
                            <v-text-field 
                              solo 
                              v-model="attentionsForm.claFirst"
                              :rules="[verify]" 
                              :error="attentionsValid.claFirst"
                              required
                              validate-on-blur
                            ></v-text-field>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('Department')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs4>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claDeptname"
                          :rules="[verify]" 
                          :error="attentionsValid.claDeptname"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs7>
                      <v-layout row wrap>
                        <v-flex xs5>
                          <div class="attention-item-name"><i class="redstar">*</i>{{$t('LastName')}}</div>
                        </v-flex>
                        <v-flex xs7>
                          <div class="attention-item-input">
                            <v-text-field 
                              solo 
                              v-model="attentionsForm.claLast"
                              :rules="[verify]" 
                              :error="attentionsValid.claLast"
                              required
                              validate-on-blur
                            ></v-text-field>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('Position')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs4>
                      <div class="attention-item-input">
                        <v-text-field solo v-model="attentionsForm.claGrade"></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs7>
                      <v-layout row wrap>
                        <v-flex xs5>
                          <div class="attention-item-name">{{$t('StaffCode')}}</div>
                        </v-flex>
                        <v-flex xs7>
                          <div class="attention-item-input">
                            <v-text-field solo v-model="attentionsForm.claStaff"></v-text-field>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2></v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs4></v-flex>
                    <v-flex xs7>
                      <v-layout row wrap>
                        <v-flex xs5>
                          <div class="attention-item-name">{{$t('RegistrationNo')}}</div>
                        </v-flex>
                        <v-flex xs7>
                          <div class="attention-item-input">
                            <v-text-field solo v-model="attentionsForm.claAgtref"></v-text-field>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('Address1')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field solo v-model="attentionsForm.claAddr1"></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('Address2')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field solo v-model="attentionsForm.claAddr2"></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2><div class="attention-item-name">{{$t('Address3')}}</div></v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field solo v-model="attentionsForm.claAddr3"></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2><div class="attention-item-name">{{$t('Address4')}}</div></v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field solo v-model="attentionsForm.claAddr4"></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('OfficeTelNo')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs3>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claTelidd"
                          :rules="[verify,max5]" 
                          :error="attentionsValid.claTelidd"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs9>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claTel"
                          :rules="[verify]" 
                          :error="attentionsValid.claTel"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('Res.TelNo')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs3>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claResidd"
                          :rules="[verify,max5]" 
                          :error="attentionsValid.claResidd"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs9>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claRestel"
                          :rules="[verify]" 
                          :error="attentionsValid.claRestel"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('MobilePhone')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs3>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claMobidd"
                          :rules="[verify,max5]"
                          :error="attentionsValid.claMobidd" 
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs9>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claMobtel"
                          :rules="[verify]" 
                          :error="attentionsValid.claMobtel"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('FaxNo')}}</div>
                </v-flex>
                <v-flex xs10>
                  <v-layout row wrap justify-space-between>
                    <v-flex xs3>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claFaxidd"
                          :rules="[verify,max5]" 
                          :error="attentionsValid.claFaxidd"
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                    <v-flex xs9>
                      <div class="attention-item-input">
                        <v-text-field 
                          solo 
                          v-model="attentionsForm.claFax"
                          :error="attentionsValid.claFax"
                          :rules="[verify]" 
                          required
                          validate-on-blur
                        ></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('E-mail')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-text-field 
                      solo 
                      v-model="attentionsForm.claEmail"
                      :rules="[verify]" 
                      :error="attentionsValid.claEmail"
                      required
                      validate-on-blur
                    ></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('MailingOption')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input personal-data">
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption1')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail1"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption2')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail2"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption3')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail3"
                        ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2></v-flex>
                <v-flex xs10>
                  <div class="attention-item-input personal-data">
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption4')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail4"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption5')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail5"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption6')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail6"
                        ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2></v-flex>
                <v-flex xs10>
                  <div class="attention-item-input personal-data">
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption7')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail7"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption8')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail8"
                        ></v-checkbox>
                      </v-flex>
                      <v-flex xs4>
                        <v-checkbox 
                          :label="$t('MailingOption9')" 
                          class="no-border " 
                          true-value="N"
                          false-value=" "
                          v-model="attentionsForm.claMail9"
                        ></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name"><i class="redstar">*</i>{{$t('Remark')}}</div>
                </v-flex>
                <v-flex xs10>
                  <div class="attention-item-input">
                    <v-textarea
                      solo
                      v-model="attentionsForm.claNote"
                      :rules="[verify]" 
                      :error="attentionsValid.claNote"
                      required
                      validate-on-blur
                    ></v-textarea>
                  </div>
                </v-flex>
              </v-layout>
            </div>
            <div class="attention-item">
              <v-layout row wrap>
                <v-flex xs2>
                  <div class="attention-item-name">{{$t('Creation')}}</div>
                </v-flex>
                <v-flex xs10>
                  <!-- ============... -->
                  <span class="weight">
                    {{attentionsForm.claCdate | formatDate}}
                    </span> {{$t('by')}} <span class="weight">{{attentionsForm.claCuser}} </span>
                  <span style="margin: 0 30px;">{{$t('Amendment')}}</span>
                  <span class="weight" >
                    {{attentionsForm.claAdate | formatDate}}
                    </span> {{$t('by')}} <span class="weight">{{attentionsForm.claAuser}} </span>
                </v-flex>
              </v-layout>
            </div>
            
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="addAndUpdata" :loading="attentionLoading">{{$t('Save')}}</v-btn>
          <v-btn flat @click="closeDialog">{{$t('Close')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ============    EFS列表    =================-->
    <v-dialog v-model="isShowEFSList"  fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{$t('EFSList')}} <v-btn color="green" @click="openEFSupdata()" small><v-icon small>add</v-icon> {{$t('Add')}}</v-btn> </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon flat @click="isShowEFSList = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
          
        </v-toolbar>
        <v-data-table
          :headers="EFSheader"
          :items="EFStableData"
          hide-actions
          :loading="efsLoading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="scope">
            <td>{{scope.item.imgType}}</td>
            <td>
              <v-checkbox v-model="scope.item.imgSync" true-value="Y" false-value="N" disabled hide-details></v-checkbox>
            </td>
            <td>{{scope.item.imgDesc}}</td>
            <td>{{scope.item.imgCuser}}</td>
            <td>{{scope.item.imgCdate | formatDate}}</td>
            <td></td>
            <td class="my-ellipsis">{{scope.item.imgFileName}}</td>
            <td>
              <v-btn color="info" icon  @click="updataFile(scope.item.imgSeqno)">
                <v-icon >cached</v-icon>
              </v-btn>
              <v-btn color="info" icon  @click="fileDownload(scope.item.imgSeqno)">
                <v-icon >cloud_download</v-icon>
              </v-btn>
              <v-btn color="info" icon  @click="previewImg(scope.item.imgSeqno)" v-if="scope.item.imgFileExt === '.jpg' || scope.item.imgFileExt === '.png'">
                <v-icon >zoom_in</v-icon>
              </v-btn>
              <v-btn color="info" icon  @click="previewPdf(scope.item.imgSeqno)" v-if="scope.item.imgFileExt === '.pdf'">
                <v-icon >zoom_in</v-icon>
              </v-btn>
              
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <!-- =============    EFS上传 11111  ==================== -->
    <v-dialog v-model="isShowAddEFS" scrollable persistent max-width="1200">
      <v-card>
        <v-card-title>{{$t('BatchUpload')}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="min-height300 personal-data my-vuetify-css">
          <div class="efs-edit-header">
            <v-layout row wrap justify-space-around>
              <v-flex xs1>{{$t('Seqno')}}</v-flex>
              <v-flex xs1>{{$t('DocType')}}</v-flex>
              <v-flex xs1>{{$t('SizeLimit')}}</v-flex>
              <v-flex xs1>{{$t('SynctoWeb')}}</v-flex>
              <v-flex xs2>{{$t('Describe')}}</v-flex>
              <v-flex xs3>{{$t('SelectFile')}}</v-flex>
              <v-flex xs1>{{$t('Remov/Add')}}</v-flex>
            </v-layout>
          </div>
          <div class="efs-edit-item" v-for="(item, index) in EFSupdataForm" :key="item._key_">
            <v-layout row wrap justify-space-around>
              <v-flex xs1>
                <v-text-field
                  solo
                  v-model="item.imgSeqno"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-select 
                  :items="EFSdocType" 
                  v-model="item.imgType"
                  item-value="tchCode"
                  item-text="tchDspval"
                  :rules="[verify]" 
                  :error="item.verify"
                  required
                  validate-on-blur
                ></v-select>
              </v-flex>
              <v-flex xs1>{{EFSsize.tchChr1 + EFSsize.tchDspval}}</v-flex>
              <v-flex xs1>
                <v-checkbox class="fileCheckbox" v-model="item.imgSync" true-value="Y" false-value="N" hide-details></v-checkbox>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  solo
                  v-model="item.imgDesc"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <uploadfile :size="EFSsize.tchChr1" :alias="EFSfileAlias" @change="handelFile($event, index)" ></uploadfile>
              </v-flex>
              <v-flex xs1>
                <v-btn icon color="red" small @click="deleteEFSlist(index)" v-if="EFSfileAlias === ''">
                  <v-icon small color="#FFFFFF">remove</v-icon>
                </v-btn>
                <v-btn icon color="green" small v-if="index === EFSupdataForm.length - 1 && EFSfileAlias === ''" @click="addUpdataItem">
                  <v-icon small color="#FFFFFF">add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <div class="efsPass">
              <span class="animated shake" :key="animateKey" v-show="isEFSisPass">{{$t('DocType/Describe/SelectFileIsRrequired!')}}</span>
            </div>
          <v-layout justify-end>
            <v-btn color="blue darken-1" flat @click="closeUploadDialog">{{$t('Close')}}</v-btn>
            <v-btn color="blue darken-1" flat @click="submitFile" :loading="uploadLoading">{{$t('Save')}}</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 图片预览 -->
    <transition name="fade">
      <div class="img-view" v-if="isShowImg" @click="isShowImg = false">
        <!-- 遮罩层 -->
        <div class="img-layer"></div>
        <div class="img">
          <img :src="previewImgSrc">
        </div>
      </div>
    </transition>

    <!-- PDF预览 -->
    <transition name="fade">
      <div class="img-view" v-if="isShowPdf" @click="isShowPdf = false">
        <!-- 遮罩层 -->
        <div class="img-layer"></div>
        <div class="img">
          <pdf class="pdf" :src="previewPdfSrc"></pdf>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// const trim = function (str) {
//   if (typeof str !== 'string') return
//   return str.replace(/(^\s*)|(\s*$)/g, '')
// }
import helper from '../helper'
import uploadfile from '../components/uploadFile.vue'
import pdf from 'vue-pdf'
import 'animate.css'
let efsKey = 0
export default {
  data () {
    const cliCode = this.$route.params.cliCode
    return {
      cliCode: cliCode,
      forbidChange: false,
      showSuccessMsg: false,
      successMsg: this.$t('Successfuloperation'),
      showErrorMsg: false,
      errorMsg: this.$t('Pleasechecktherequiredfields'),
      alertTime: null,
      isLoading: false,
      clientTypes: [],
      statusList: [
        {
          value: 'A',
          label: 'Active'
        },
        {
          value: 'C',
          label: 'Close'
        },
        {
          value: 'D',
          label: 'Delete'
        },
        {
          value: 'S',
          label: 'Suspend'
        }
      ],
      countrys: [
        {
          value: 'MAC',
          label: 'MACAU'
        },
        {
          value: 'JAP',
          label: 'JAPAN'
        },
        {
          value: 'KOR',
          label: 'KOREA(SOUTH)'
        },
        {
          value: 'MAL',
          label: 'MALAYSIA'
        },
        {
          value: 'MAU',
          label: 'MAURITIUS'
        },
        {
          value: 'MEX',
          label: 'MEXICO'
        }
      ],
      NatureArr: [
        {
          value: 'C',
          label: 'Company'
        },
        {
          value: 'A',
          label: 'Individual'
        }
      ],
      occupations: [
        {
          value: '%',
          label: 'Whatever'
        },
        {
          value: '0',
          label: '個人及散戶'
        },
        {
          value: 'AC',
          label: 'Culture & Religion'
        },
        {
          value: 'CC',
          label: 'Construction incl. Real Estate'
        },
        {
          value: 'CD',
          label: 'Decoration'
        },
        {
          value: 'AZ',
          label: 'Others'
        },
        {
          value: 'SG',
          label: 'SG'
        },
        {
          value: 'FO',
          label: 'FO'
        },
        {
          value: 'ER',
          label: 'ER'
        },
        {
          value: 'IO',
          label: 'IO'
        },
        {
          value: 'IW',
          label: 'IW'
        },
        {
          value: 'RA',
          label: 'RA'
        },
        {
          value: 'SB',
          label: 'SB'
        },
        {
          value: '00',
          label: '00'
        },
        {
          value: 'CZ',
          label: 'CZ'
        },
        {
          value: 'EG',
          label: 'EG'
        },
        {
          value: 'RS',
          label: 'RS'
        },
        {
          value: 'ES',
          label: 'ES'
        },
        {
          value: 'EN',
          label: 'EN'
        },
        {
          value: 'RC',
          label: 'RC'
        },
        {
          value: 'GF',
          label: 'GF'
        },
        {
          value: 'RE',
          label: 'RE'
        },
        {
          value: 'FR',
          label: 'FR'
        },
        {
          value: 'IM',
          label: 'IM'
        },
        {
          value: 'IT',
          label: 'IT'
        },
        {
          value: 'CW',
          label: 'CW'
        },
        {
          value: 'SO',
          label: 'SO'
        },
        {
          value: 'EZ',
          label: 'EZ'
        },
        {
          value: 'FI',
          label: 'FI'
        },
        {
          value: 'CS',
          label: 'CS'
        },
        {
          value: 'IP',
          label: 'IP'
        },
        {
          value: 'IG',
          label: 'IG'
        },
        {
          value: 'CL',
          label: 'CL'
        },
        {
          value: 'IE',
          label: 'IE'
        },
        {
          value: 'IF',
          label: 'IF'
        },
        {
          value: 'IL',
          label: 'IL'
        },
        {
          value: 'GP',
          label: 'GP'
        },
        {
          value: 'RF',
          label: 'RF'
        },
        {
          value: 'IU',
          label: 'IU'
        },
        {
          value: 'FZ',
          label: 'FZ'
        },
        {
          value: 'RM',
          label: 'RM'
        },
        {
          value: 'SH',
          label: 'SH'
        },
        {
          value: 'SC',
          label: 'SC'
        },
        {
          value: 'IK',
          label: 'IK'
        },
        {
          value: 'IA',
          label: 'IA'
        },
        {
          value: 'CE',
          label: 'CE'
        },
        {
          value: 'GM',
          label: 'GM'
        },
        {
          value: 'RU',
          label: 'RU'
        },
        {
          value: 'PM',
          label: 'PM'
        },
        {
          value: 'IZ',
          label: 'IZ'
        },
        {
          value: 'FT',
          label: 'FT'
        },
        {
          value: 'FB',
          label: 'FB'
        },
        {
          value: 'RZ',
          label: 'RZ'
        },
        {
          value: 'IC',
          label: 'IC'
        },
        {
          value: 'ID',
          label: 'ID'
        },
        {
          value: 'ST',
          label: 'ST'
        },
        {
          value: 'SZ',
          label: 'SZ'
        },
        {
          value: 'CR',
          label: 'CR'
        },
        {
          value: 'EC',
          label: 'EC'
        }
      ],
      idCards: [
        {
          value: 'B',
          label: 'BNO'
        },
        {
          value: 'C',
          label: 'CI'
        },
        {
          value: 'I',
          label: 'HKID'
        },
        {
          value: 'M',
          label: 'Macau ID'
        },
        {
          value: 'O',
          label: 'Others'
        },
        {
          value: 'p',
          label: 'Passport'
        },
        {
          value: 'X',
          label: 'PRC ID'
        }
      ],
      sexList: [
        {
          value: 'M',
          label: 'Male'
        },
        {
          value: 'F',
          label: 'Female'
        }
      ],
      maritals: [
        {
          value: 'M',
          label: 'Marriaged'
        },
        {
          value: 'N',
          label: 'NA'
        },
        {
          value: 'S',
          label: 'Single/Widowed/Divorce'
        },
        {
          value: 'D',
          label: 'Seperated'
        }
      ],
      banks: [
        {
          value: '00031',
          label: '南洋商業銀行/香港/0434721091562'
        },
        {
          value: '00032',
          label: '南洋商業銀行/香港/0434720038120'
        },
        {
          value: '00033',
          label: '大西洋銀行/澳門/9013025939'
        },
        {
          value: '00034',
          label: '大西洋銀行/澳門/9013025990'
        },
        {
          value: '00035',
          label: '中國銀行股份有限公司-橫琴車專用'
        },
        {
          value: '90001',
          label: 'Excess Dummy Bank'
        }
      ],
      payments: [
        {
          label: 'Autopay',
          value: null
        }
      ],
      formValid: {
        cliCode: false,
        cliType: false,
        cliSt: false,
        cliLname: false,
        cliSname: false,
        cliAddr1: false,
        cliAddr2: false,
        cliAddr3: false,
        cliAddr4: false,
        cliEmail: false,
        cliCty: false,
        cliZip: false,
        cliTelidd: false,
        cliTel: false,
        cliResidd: false,
        cliRestel: false,
        cliFaxidd: false,
        cliFax: false,
        cliNote: false
      },
      // 表单数据
      clientForm: {
        cliCode: '',
        cliType: '',
        cliSt: '',
        cliArea: '',
        cliXref: '',
        cliLname: '',
        cliSname: '',
        cliCname: '',
        cliAddr1: '',
        cliAddr2: '',
        cliAddr3: '',
        cliAddr4: '',
        cliCty: '',
        cliZip: '',
        cliTelidd: '',
        cliTel: '',
        cliResidd: '',
        cliRestel: '',
        cliFaxidd: '',
        cliFax: '',
        cliMobidd: '',
        cliMobtel: '',
        cliEmail: '',
        cliNat: 'C',
        cliOccup: '%',
        cliBrn: '',
        cliForres: '',
        cliMar: '',
        cliPIdtype: 'M',
        cliPIdcard: '',
        cliPSex: '',
        cliPBirth: '',
        cliBankac: null,
        cliPaymthd: null,
        cliJoindate: '',
        cliGroup: ' ',
        cliRplcby: '',
        cliAlwagt: '',
        cliRmkkey: null,
        cliNote: '',
        cliRndgDn: '',
        cliBankagt: '',
        cliIagstatus: '',
        cliLoginid: '',
        cliSyncprofiledate: '',
        cliCdate: new Date().toISOString().substr(0, 10),
        cliCuser: helper.ls.get('userName'),
        cliAdate: new Date().toISOString().substr(0, 10),
        cliAuser: helper.ls.get('userName'),
        cliCrdays: '',
        // 以下是页面没有的字段
        cliTlxidd: ' ',
        cliTlx: ' ',
        cliBank: ' ',
        cliAtnac: ' ',
        cliAtnclm: ' ',
        cliAtnuw: ' ',
        cliAtnfac: ' ',
        cliAtntty: ' ',
        cliCapccy: 'MOP',
        cliCapamt: 0,
        cliOffice: 'CIM',
        cliStaff: ' ',
        cliLock: 0,
        cliAr: 'Y',
        cliJoinsts: null,
        cliStdate: null,
        cliNote1: null,
        cliAgent: ' ',
        cliUnit: ' ',
        cliCli: null,
        cliTaxfile: null,
        cliRegno: null,
        cliNum: null,
        cliLic: null,
        cliDbtnm: null,
        cliMlock: null,
        cliMlockdt: null,
        cliMlockrmk: null,
        cliOsysdt: null,
        cliOday: null,
        cliOuptot: null,
        cliOby: null,
        cliOrmk: null,
        cliDismgr: null,
        cliSuper: null,
        cliCtdt: null,
        cliCtby: null,
        cliCtgrcdt: null,
        cliCtgrcrmk: null,
        cliSoamp: null,
        cliSoaskip: null,
        cliSkiplock: null,
        cliRenappdt: null,
        cliAchandle: null,
        cliPager: null,
        cliStrmk: null,
        cliGuar: null,
        cliAddr9: null,
        cliSaddr1: null,
        cliSaddr2: null,
        cliSaddr3: null,
        cliSaddr9: null,
        cliRsr1: null,
        cliRsr2: null,
        cliLicense: null,
        cliLictxt: null,
        cliIntroby: null,
        cliAlwteam: null,
        cliLocksts: null,
        cliForagt: null,
        cliSrc: null,
        cliComm2main: null,
        cliMainagt: null,
        cliDiv: null,
        cliTermdt: null,
        cliLoc1: null,
        cliLoc2: null,
        cliBirthplace: null,
        cliStdname: null,
        cliNicknm: null,
        cliOthnm: null,
        cliFirstnm: null,
        cliSurnm: null,
        cliNeedizufee: null,
        cliDept: null,
        cliOpolcnt: null,
        cliAppno: null,
        cliAdjno: null,
        cliCommgrp: null,
        cliStdcommgrp: null,
        cliIsspol: 'Y',
        cliIsscomm: 'Y',
        cliCommgrp01: null,
        cliRelation: null,
        cliMustizufee: 'N',
        cliDeductrate: 0,
        cliPc01: null,
        cliPc02: null,
        cliPc03: null,
        cliPc04: null,
        cliPc05: null,
        cliPc06: null,
        cliPrtrcp: null,
        cliStmntby: null,
        cliStmntfmt: '000',
        cliShownet: null,
        cliMbrof: null,
        cliSameas: null,
        cliOpolisr: null,
        cliOpolcls: null,
        cliNote9: null,
        cliSkiprcp: null,
        cliEndreg: null,
        cliRmkkey1: null,
        cliAgtlock: 'N',
        cliSrcgrp: null,
        cliMlock2: null,
        cliMlockdt2: null,
        cliMlockrmk2: null,
        cliIsspol2: 'N',
        cliCodfr: null,
        cliCodto: null,
        cliCodfr2: null,
        cliCodto2: null,
        cliEndreg02: null,
        cliQli: null,
        cliRegno01: null,
        cliRegno02: null,
        cliRegtype: null,
        cliSrcregno: null,
        cliSrctype: ' ',
        cliStartreg: null,
        cliStartreg02: null,
        cliGroup1: ' ',
        cliGroup2: ' ',
        cliGroup3: 'N',
        cliResyncflag: null,
        page: null,
        xrenew: null
      },
      headers: [
        {
          text: 'Contact'
        },
        {
          text: 'Name'
        },
        {
          text: 'Staff'
        },
        {
          text: 'Registration No'
        },
        {
          text: 'Title'
        },
        {
          text: 'Tel No'
        },
        {
          text: 'Fax No'
        },
        {
          text: 'operate'
        }
      ],
      attentionsData: [],
      attentionLoading: false,
      attentionsValid: {
        claName: false,
        claTitle: false,
        claDeptname: false,
        claFirst: false,
        claLast: false,
        claTelidd: false,
        claTel: false,
        claResidd: false,
        claRestel: false,
        claMobidd: false,
        claMobtel: false,
        claFaxidd: false,
        claFax: false,
        claEmail: false,
        claNote: false
      },
      attentionsForm: {
        claItem: null,
        claCode: '',
        claName: '',
        claLast: '',
        claFirst: '',
        claGrade: '',
        claTitle: '',
        claDeptname: '',
        claStaff: '',
        claAddr1: '',
        claAddr2: '',
        claAddr3: '',
        claAddr4: '',
        claAgtref: '',
        claTelidd: '',
        claTel: '',
        claResidd: '',
        claRestel: '',
        claMobidd: '',
        claMobtel: '',
        claFaxidd: '',
        claFax: '',
        claEmail: '',
        claEname: ' ',
        claNote: '',
        claMail1: ' ',
        claMail2: ' ',
        claMail3: ' ',
        claMail4: ' ',
        claMail5: ' ',
        claMail6: ' ',
        claMail7: ' ',
        claMail8: ' ',
        claMail9: ' '
      },
      attentionsSubmitType: null,
      dialog: false,
      isValid: true,
      items: [
        {
          text: this.$t('ClientManager'),
          disabled: false,
          href: '#/client-manager'
        },
        {
          text: this.$t('Edit'),
          disabled: true,
          href: '/client-manager-edit'
        }
      ],
      occupationArr: ['Othres'],
      isShowAddEFS: false,
      isShowEFSList: false,
      efsLoading: false,
      EFSheader: [
        { text: 'Doc Type' },
        { text: 'Sync to Web' },
        { text: 'Document Description' },
        { text: 'Created by' },
        { text: 'Created on' },
        { text: 'File Modified' },
        { text: 'File Name' },
        { text: 'Operation' }
      ],
      EFStableData: [],
      // 22222
      EFSsubmitSuccess: false,
      successNumber: 0,
      EFSdocType: [],
      EFSsize: {},
      EFSunitForm: {
        _key_: 0,
        imgClicode: cliCode,
        imgSeqno: '',
        imgType: '',
        imgSync: '',
        imgFileBase64: '',
        imgDesc: '',
        imgFileName: '',
        imgFilePath: '',
        imgFileExt: ''
      },
      EFSfileAlias: '',
      EFSupdataForm: [],
      previewImgSrc: '',
      isShowImg: false,
      previewPdfSrc: '',
      isShowPdf: false,
      isEFSisPass: false,
      uploadLoading: false,
      animateKey: 0
    }
  },
  mounted () {
    const cliCode = this.$route.params.cliCode
    if (cliCode !== 'add') {
      this.clientInfoQuery(cliCode)
      this.attentionsListQuery(cliCode)
      this.forbidChange = true
    } else {
      this.items[1].text = this.$t('Add')
    }
    this.clientTypeQuery()
  },
  methods: {
    /**
     * 查询clientType下拉框列表
     */
    clientTypeQuery () {
      this.$fetch('/ipoly/clientManager/getClientType.json')
        .then(res => {
          let types = []
          res.body.map(item => {
            let obj = {}
            obj['label'] = item.cleName
            obj['value'] = item.cleCode
            types.push(obj)
          })
          this.clientTypes = types
        })
    },

    /**
     * 根據clientCode查詢信息
     * @param {string} clientCode 客戶代碼
     */
    clientInfoQuery (clientCode) {
      this.$fetch(`/ipoly/clientManager/getClifl.json?cliCode=${clientCode}`)
        .then(res => {
          this.handelWebDate(res.body)
          this.bindingData(this.clientForm, res.body)
          // this.clientForm = res.body
        })
    },
    /**
     * 新增clientInfo
     */
    addClient (copyBody) {
      this.isLoading = true
      this.$fetch({
        method: 'POST',
        url: '/ipoly/clientManager/addClientManager.json',
        body: copyBody
      })
        .then(res => {
          if (res.responseCode === 1000) {
            this.successMsg = 'Successful operation!'
            this.showSuccessMsg = true
            this.closeAlert().then(() => {
              this.$router.go(-1)
              this.isLoading = false
            })
          } else if (res.responseCode !== 5000 && res.responseCode !== 'SYSTEM_EXCEPTION') {
            this.isLoading = false
            this.errorMsg = res.message
            this.showErrorMsg = true
            this.closeAlert()
          } else {
            this.errorMsg = this.$t('Systemerror,pleasetryagainlater!')
            this.showErrorMsg = true
            this.closeAlert()
          }
        })
    },
    /**
     * 修改clientInfo
     */
    updateClient (copyBody) {
      this.isLoading = true
      this.$fetch({
        method: 'POST',
        url: '/ipoly/clientManager/updateClientManager.json',
        body: copyBody
      })
        .then(res => {
          if (res.responseCode === 1000) {
            this.successMsg = 'Successful operation!'
            this.showSuccessMsg = true
            this.closeAlert().then(() => {
              this.$router.go(-1)
              this.isLoading = false
            })
          } else if (res.responseCode !== 5000 && res.responseCode !== 'SYSTEM_EXCEPTION') {
            this.errorMsg = res.message
            this.showErrorMsg = true
            this.isLoading = false
            this.closeAlert()
          } else {
            this.errorMsg = this.$t('Systemerror,pleasetryagainlater!')
            this.showErrorMsg = true
            this.closeAlert()
            this.isLoading = false
          }
        })
    },
    /**
     * 提交表单数据
     */
    submitClientInfo () {
      const isVerify = this.verifyForm('client')
      if (!isVerify) return
      const param = this.$route.params.cliCode
      // 克隆一个对象进行格式处理
      let copyBody = this.copy(this.clientForm)
      this.handelDateFormat(copyBody)
      if (param === 'add') {
        this.addClient(copyBody)
      } else {
        this.updateClient(copyBody)
      }
    },
    /**
     * 新增Attentions项
     */
    addAttentions () {
      this.attentionsSubmitType = 'add'
      this.dialog = true
    },
    /**
     * 查询Attentions列表
     * @param {string} clientCode 客户编码
     */
    attentionsListQuery (clientCode) {
      this.$fetch(`/ipoly/clientManager/getAttentions.json?cliCode=${clientCode}`)
        .then(res => {
          this.attentionsData = res.body
        })
    },
    /**
     * 根据cliCode和cliItem查询Attentions信息
     * @param {string} cliCode 客户编码
     * @param {string} cliItem 自增加的 Contact Code
     */
    attentionsItemQuery (cliCode, cliItem) {
      let param = {
        claCode: cliCode,
        claItem: cliItem
      }
      this.$fetch({
        method: 'POST',
        url: '/ipoly/clientManager/getAttentionInfo.json',
        body: param
      })
        .then(res => {
          this.bindingData(this.attentionsForm, res.body)
        })
    },
    /**
     * 编辑Attentions
     * @param {string} cliCode client code
     * @param {string} cliItem Contact code
     */
    editAttentions (cliCode, cliItem) {
      this.dialog = true
      this.attentionsSubmitType = 'edit'
      this.attentionsItemQuery(cliCode, cliItem)
    },
    /**
     * 提交 新增Attentions || 提交 编辑Attentions
     */
    addAndUpdata () {
      if (!this.verifyForm('attentions')) return
      let param = this.copy(this.attentionsForm)
      param.claCode = this.clientForm.cliCode
      if (this.attentionsSubmitType === 'add') {
        param.claItem = null
      }
      this.attentionLoading = true
      this.$fetch({
        method: 'POST',
        url: '/ipoly/clientManager/addOrUpdateClafl.json',
        body: param
      })
        .then(res => {
          if (res.responseCode === 1000) {
            // 新增或者修改成功
            this.attentionsListQuery(this.$route.params.cliCode)
            this.successMsg = 'Successful operation!'
            this.showSuccessMsg = true
            this.closeAlert().then(() => {
              this.attentionLoading = false
              this.closeDialog()
            })
          } else if (res.responseCode !== 5000 && res.responseCode !== 'SYSTEM_EXCEPTION') {
            this.errorMsg = res.message
            this.showErrorMsg = true
            this.closeAlert()
            this.attentionLoading = false
          } else {
            this.errorMsg = this.$t('Systemerror,pleasetryagainlater!')
            this.showErrorMsg = true
            this.closeAlert()
            this.attentionLoading = false
          }
        })
    },
    /**
     * 重置校验
     * @param {object} validObj 必填项的对象，对应表单Form的字段名称
     */
    resetValid (validObj) {
      for (let i in validObj) {
        validObj[i] = false
      }
    },
    /**
     * 关闭dialog 每次关闭后，都重置一遍form数据
     */
    closeDialog () {
      this.dialog = false
      // 初始化attentionsForm数据
      for (let i in this.attentionsForm) {
        this.attentionsForm[i] = ''
        if (i.indexOf('claMail') !== -1) {
          this.attentionsForm[i] = ' '
        }
      }
      this.attentionsForm.claEname = ' '
      // 初始化完成数据之后，开启校验功能
      this.resetValid(this.attentionsValid)
    },
    /**
     * 校验规则 为空判断
     */
    verify (v) {
      if (v === null || v === '') {
        return 'Is required!'
      }
      return true
    },
    max6 (v) {
      if (v.length > 6) {
        return 'Maximum 6'
      }
      return true
    },
    max5 (v) {
      if (v.length > 5) {
        return 'Maximum 5'
      }
      return true
    },
    /**
     * 校验必填项是否为空
     * @param {string} dataName client: 校验formValid || attentions: 校验attentionsValid
     * @return {boolean} true则校验通过，false则有必填项为空
     */
    verifyForm (dataName) {
      if (dataName === 'client') {
        return this.verifyStep(this.clientForm, this.formValid)
        // for (let name in this.clientForm) {
        //   if (this.clientForm[name] === null || this.clientForm[name] === '') {
        //     if (name in this.formValid) {
        //       this.formValid[name] = true
        //       this.errorMsg = this.$t('Pleasechecktherequiredfields')
        //       this.showErrorMsg = true
        //       this.closeAlert()
        //       isPass = false
        //     }
        //   }
        // }
      } else if (dataName === 'attentions') {
        return this.verifyStep(this.attentionsForm, this.attentionsValid)
        // for (let name in this.attentionsForm) {
        //   if (this.attentionsForm[name] === null || this.attentionsForm[name] === '') {
        //     if (name in this.attentionsValid) {
        //       this.attentionsValid[name] = true
        //       this.errorMsg = this.$t('Pleasechecktherequiredfields')
        //       this.showErrorMsg = true
        //       this.closeAlert()
        //       isPass = false
        //     }
        //   }
        // }
      }
    },
    verifyStep (obj1, obj2) {
      let isPass = true
      if (helper.type.isObj(obj1) && helper.type.isObj(obj2)) {
        for (let name in obj1) {
          if (obj1[name] === null || obj1[name] === '') {
            if (name in obj2) {
              obj2[name] = true
              this.errorMsg = this.$t('Pleasechecktherequiredfields')
              this.showErrorMsg = true
              this.closeAlert()
              isPass = false
            }
          }
        }
      }
      return isPass
    },
    /**
     * 处理日期插件的格式
     * 后台接收格式是时间戳，UI组件绑定是字符串，如：2019-19-19
     */
    handelDateFormat (obj) {
      let birthDate = obj.cliPBirth
      let joinDate = obj.cliJoindate
      let syncDate = obj.cliSyncprofiledate
      if (birthDate) {
        obj.cliPBirth = Number(new Date(birthDate))
      }
      if (joinDate) {
        obj.cliJoindate = Number(new Date(joinDate))
      }
      if (syncDate) {
        obj.cliSyncprofiledate = Number(new Date(syncDate))
      }
    },
    /**
     * 接收返回数据，把时间转换为字符串格式
     */
    handelWebDate (obj) {
      if (obj.cliPBirth && obj.cliPBirth !== ' ') {
        obj.cliPBirth = new Date(obj.cliPBirth).toISOString().substr(0, 10)
      }
      if (obj.cliJoindate && obj.cliJoindate !== ' ') {
        obj.cliJoindate = new Date(obj.cliJoindate).toISOString().substr(0, 10)
      }
      if (obj.cliSyncprofiledate && obj.cliSyncprofiledate !== ' ') {
        obj.cliSyncprofiledate = new Date(obj.cliSyncprofiledate).toISOString().substr(0, 10)
      }
    },
    /**
     * 3秒关闭警告窗口
     */
    closeAlert () {
      if (!this.alertTime) {
        return new Promise(resolve => {
          this.alertTime = setTimeout(() => {
            this.showErrorMsg = false
            this.showSuccessMsg = false
            this.successMsg = ''
            this.EFSsubmitSuccess = false
            this.successNumber = 0
            this.alertTime = null
            resolve()
          }, 3000)
        })
      }
    },
    /**
     * 拷贝一个对象
     */
    copy (obj) {
      if (!helper.type.isObj(obj)) {
        return obj
      }
      var newobj = {}
      for (var attr in obj) {
        newobj[attr] = this.copy(obj[attr])
      }
      return newobj
    },
    /**
     * 绑定数据
     * 查询到数据时，如果空值的数据不进行绑定，防止触发校验
     * @param {array、object} formData 原有的默认绑定数据
     * @param {array、object} resData 请求返回的数据
     */
    bindingData (formData, resData) {
      for (let i in resData) {
        if (resData[i] !== null && resData[i] !== '') {
          formData[i] = resData[i]
        }
      }
    },
    /**
     * 打开EFS窗口，发起列表查询 33333
     */
    openEFSList () {
      // ADFASDFASDF
      // document.body.style.overflowY = 'hidden'
      this.queryDocType()
      this.isShowEFSList = true
      this.EFStableData = []
      this.queryEFSlist()
    },
    /**
     * 打开上传或者更新窗口
     */
    openEFSupdata (obj) {
      this.isShowAddEFS = true
      if (obj) {
        this.addUpdataItem(obj)
      } else {
        this.addUpdataItem()
      }
    },
    /**
     * 增加一项EFS上传数据
     */
    addUpdataItem (obj) {
      // 需要一个自增key值，防止dom复用
      const newKey = efsKey + 1
      if (obj) {
        this.EFSupdataForm.push(obj)
      } else {
        this.EFSupdataForm.push({
          _key_: newKey,
          imgClicode: this.cliCode,
          imgSeqno: '',
          imgType: '',
          imgSync: '',
          imgFileBase64: '',
          imgDesc: '',
          imgFileName: '',
          imgFilePath: '',
          imgFileExt: '',
          verify: false
        })
      }
      efsKey++
    },
    /**
     * 提交文件上传
     */
    submitFile () {
      let body = []
      let pass = true
      this.EFSupdataForm.map(item => {
        if (item.imgFileBase64 && item.imgType && item.imgDesc) {
          item.imgClicode = this.cliCode
          body.push(item)
        } else {
          pass = false
        }
      })
      if (!pass) {
        this.isEFSisPass = true
        this.animateKey++
        return
      }
      this.uploadLoading = true
      this.isEFSisPass = false
      this.$fetch({
        method: 'POST',
        url: '/ipoly/clientManager/batchEFS.json',
        body: body
      })
        .then(res => {
          if (res.responseCode === 1000) {
            this.EFSsubmitSuccess = true
            this.successNumber = body.length
            this.queryEFSlist()
            this.closeAlert().then(() => {
              this.closeUploadDialog()
              this.uploadLoading = false
            })
          } else if (res.responseCode !== 5000 && res.responseCode !== 'SYSTEM_EXCEPTION') {
            this.errorMsg = res.message
            this.showErrorMsg = true
            this.closeAlert()
            this.closeUploadDialog()
            this.uploadLoading = false
          } else {
            this.errorMsg = this.$t('Systemerror,pleasetryagainlater!')
            this.showErrorMsg = true
            this.closeAlert()
            this.closeUploadDialog()
            this.uploadLoading = false
          }
        })
    },
    updataFile (seqno) {
      // 根据seqno获取当前数据 55555
      this.EFStableData.map(item => {
        if (item.imgSeqno === seqno) {
          this.EFSfileAlias = item.imgFileName
          const newKey = efsKey + 1
          let obj = {
            _key_: newKey,
            imgClicode: this.cliCode,
            imgSeqno: item.imgSeqno,
            imgType: item.imgType,
            imgSync: item.imgSync,
            imgFileBase64: item.imgFileBase64,
            imgDesc: item.imgDesc,
            imgFileName: item.imgFileName,
            imgFilePath: item.imgFilePath,
            imgFileExt: item.imgFileExt
          }
          this.openEFSupdata(obj)
        }
      })
    },
    /**
     * 关闭上传窗口，清空form的数据
     */
    closeUploadDialog () {
      this.isShowAddEFS = false
      this.EFSupdataForm = []
      this.EFSfileAlias = ''
      this.isEFSisPass = false
    },
    /**
     * 查询EFS已有的列表
     */
    queryEFSlist () {
      this.efsLoading = true
      this.$fetch(`/ipoly/clientManager/getEFSList.json?cliCode=${this.cliCode}`)
        .then(res => {
          this.EFStableData = res.body
          this.efsLoading = false
        })
    },
    /**
     * 查询docType下拉框
     */
    queryDocType () {
      this.$fetch('/ipoly/clientManager/getTchfl.json')
        .then(res => {
          this.EFSdocType = res.body.docType
          this.EFSsize = res.body.fileInfo
        })
    },
    /**
     * 处理选择文件的时候返回的信息
     * @param {Object} event  组件默认参数，返回一个对象包含文件名、文件后缀、文件base64编码
     * @param {number} v-for 循环时的下标值
     */
    handelFile (event, index) {
      const obj = Object.assign({}, this.EFSupdataForm[index], event)
      this.EFSupdataForm[index] = obj
    },
    /**
     * 根据下标值删除某一项上传文件
     * @param {number} deleteIndex  需要删除的下标值
     */
    deleteEFSlist (deleteIndex) {
      this.EFSupdataForm.splice(deleteIndex, 1)
    },
    /**
     * 预览图片
     */
    previewImg (seqno) {
      let src = process.env.BASE_API + `/ipoly/clientManager/EFS/download.json?cliCode=${this.cliCode}&imgSeqno=${seqno}&online=true`
      this.previewImgSrc = src
      this.isShowImg = true
    },
    /**
     * 预览pdf
     */
    previewPdf (seqno) {
      let src = process.env.BASE_API + `/ipoly/clientManager/EFS/download.json?cliCode=${this.cliCode}&imgSeqno=${seqno}&online=true`
      this.previewPdfSrc = src
      this.isShowPdf = true
    },
    /**
     * 文件下载
     */
    fileDownload (seqno) {
      let src = process.env.BASE_API + `/ipoly/clientManager/EFS/download.json?cliCode=${this.cliCode}&imgSeqno=${seqno}&online=false`
      window.open(src)
    }
  },
  filters: {
    formatDate (date) {
      return new Date(date || new Date()).toISOString().substr(0, 10)
    }
  },
  components: {
    uploadfile,
    pdf
  }
}
</script>
<style lang="less" scoped>
.clear {
  overflow: hidden;
}
.container {
  padding: 0!important;
}
.theme--light.v-sheet {
  background: rgb(242,248,251);
}
.my-content {
  background: rgb(242,248,251);
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
.right-option .item {
  padding-bottom: 30px!important;
}
.elevation-2 {
  box-shadow: none !important;
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
  background: #fff;
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
  .area-border {
    border: 1px solid #eee;
    position: relative;
    padding: 20px 10px;
    margin: 10px 0;
    .title {
      position: absolute;
      top: -16px;
      left: 10px;
      background: #fff;
      font-size: 12px;
      padding: 5px;
    }
    .v-input {
      margin-bottom: 8px;
    }
  }
 
}
.right-option .item {
  padding-bottom: 10px;
}
.pd10 {
  padding: 10px;
}
.item-checkbox {
  max-width: 150px;
}
.dialog-content {
  padding: 20px;
}
.attention-item {
  margin-bottom: 8px;
}
.attentions-table {
  padding: 10px;
}
.redstar {
  font-style: normal;
  color: red;
}
.min-height300 {
  min-height: 300px;
}
.efs-edit-header {
  border-bottom: 1px solid #666666;
  line-height: 30px;
  margin-block-end: 10px;
}
.efs-edit-item {
  line-height: 36px;
}
.efsPass {
  line-height: 36px;
  color: red;
  margin-right: 20px;
  display: block;
  width: 100%;
  padding-left: 20px;
}
.my-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: translate3D(100%, 0, 0);
}


/* bigimg */

.img-view {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999999999;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
}

/*不限制图片大小，实现居中*/
.img-view .img {
  img {
    max-width: 1200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1000;
  }
  .pdf {
    max-width: 1200px;
    height: 900px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index:1000;
  }
}
</style>


<style lang="less">
/* 全局樣式 */
.v-text-field.v-text-field--solo > .v-input__control > .v-input__slot {
  box-shadow: none !important;
  border-bottom: 1px solid rgb(210,210,210) !important;
}
.v-input__slot {
  
}
.no-border .v-input__slot {
  border: none;
}
.my-vuetify-css .v-input__control {
  min-height: 32px !important;
}
.personal-data .v-text-field,
.info-item-input .v-text-field {
  margin-top: 0;
  padding-top: 0;
}
.personal-data .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}
.btn-group .v-btn__content {
  color: #FFF;
}
.btn-group .flex {
  padding: 0 !important;
}
.item-checkbox .v-input--selection-controls{
  padding: 0;
  margin: 0;
}
.dialog-content {
  .v-text-field.v-text-field--solo {
    .v-input__control {
          min-height: 32px;
    }
  } 
}
.fileCheckbox .v-input__slot {
  border: 0;
}
</style>
