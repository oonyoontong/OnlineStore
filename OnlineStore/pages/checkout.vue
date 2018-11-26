<template>
   <div class="capsule">
     <div class="block shipping">
       <b-container class="shipping-select select">
         <b-form-group>
           <h3>Choose a shipping address</h3>
           <br/>
           <div v-for="item in shipping">
             <input type="radio" :value="item" v-model="shippingSelect">
             <label>
               &nbsp;
               <b>{{item.name}}</b>
               {{item.address1}}
               {{item.address2}},
               {{item.state}},
               {{item.country}},
               {{item.postalCode}}
             </label>
             &nbsp;
             <span>
               <b-link @click="populateShippingEdit(item)">
                 Edit
               </b-link>
             </span>
           </div>

           <span class="fa-plus fa"></span><b-link @click="newShipping"> &nbsp;Add a new address</b-link>

         </b-form-group>
       </b-container>

       <div class="shipping-edit">
         <transition name="modal" v-if="shippingModal">
           <div class="modal-mask">
             <div class="modal-wrapper">
               <div class="modal-container">
                 <div class="modal-header">

                   <slot name="header">
                   </slot>
                 </div>

                 <div class="modal-body">
                   <slot name="body">
                     default body
                   </slot>
                 </div>

                 <div class="modal-footer">
                   <slot name="footer">
                     <button class="modal-default-button submit-button" @click="shippingModal = false">
                       OK
                     </button>

                     <button class="modal-default-button delete-button" @click="deleteShipping" v-if="isShippingEdit">
                       Delete
                     </button>
                   </slot>
                 </div>
               </div>
             </div>
           </div>
         </transition>
       </div>
     </div>

     <div class="block billing">
       <b-container class="billing-select select">
         <b-form-group>
           <h3>Choose a payment method</h3>
           <br/>

           <table class="billing-table">
             <tr>
               <th>Your credit and debit cards</th>
               <th>Name on card</th>
               <th>Expires on</th>
             </tr>

             <tr v-for="item in billing">
               <td>
                 &nbsp; <input type="radio" :value="item" v-model="billingSelect">&nbsp;
                 <b>MasterCard</b> ending in {{item.ccNumber.slice(12,16)}}</td>
               <td>{{item.name}}</td>
               <td>{{item.expMonth}}/{{item.expYear}}</td>
             </tr>
             <tr style="padding-bottom: 5px;">
               <td>
                 &nbsp;<span class="fa-plus fa"></span><b-link @click="newBilling"> &nbsp;Add a new payment method</b-link>
               </td>
               <td></td>
               <td></td>
             </tr>
           </table>
         </b-form-group>


         <div class="promo">
           <b-row align-h="start">
             <b-col cols="4">
               <b-form-input
                 class="promo"
                 v-model="promoCode"
                 type="text"
                 placeholder="Add a promotion code"
               >
               </b-form-input>
             </b-col>
             <b-col cols="1">
               <b-button class="promo-button">
                 Apply
               </b-button>
             </b-col>
           </b-row>
         </div>
       </b-container>

       <!--CC Number, Name on card, Expiration date-->
       <!--SHOW SELECTED: CC Number, Billing address-->

     </div>



     <div class="cart"></div>





   </div>

</template>

<script>
  export default {
    layout: 'admin',
    data () {
      return {
        shippingModal: false,
        billingModal: false,
        isShippingEdit: false,
        isBillingEdit: false,
        shippingSelect: {},
        billingSelect: {},
        shippingEdit: {},
        billingEdit: {}
      }
    },
    computed: {
      shipping: function () {
        return this.$store.state.checkout.shippingList
      },
      billing: function () {
        return this.$store.state.checkout.billingList
      }
    },
    methods: {
      populateShippingEdit (item) {
        this.shippingModal = !this.shippingModal
        this.shippingEdit = item
        this.isShippingEdit = true
      },
      clearShippingEdit (item) {
        this.shippingEdit = {}
        this.isShippingEdit = false
      },
      populateBillingEdit (item) {
        this.billingModal = !this.billingModal
        this.billingEdit = {item}
      },
      clearBillingEdit (item) {
        this.billingEdit = {}
      },
      newShipping () {
        this.shippingModal = !this.shippingModal
        this.clearShippingEdit()
      },
      newBilling () {
        this.billingModal = !this.billingModal
        this.clearBillingEdit()
      },
      deleteShipping(){
      }

    }
  }
</script>

<style scoped>
  .block {
    background-color: white;
    padding: 20px;
    margin-top: 40px;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 60%;
    margin: 0px auto;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }


  .delete-button {
    color: red;
    border-color: red;
  }

  .delete-button:hover {
    color: white;
    background-color: red;
  }
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .billing-table {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 20%;
  }

  th {
    padding: 5px;
  }


  .fa-plus {
    color: lightgray;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .promo-button {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
