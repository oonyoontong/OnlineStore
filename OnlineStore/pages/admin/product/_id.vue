<template>
  <div class="capsule">
    <b-form class="product-edit" @submit="handleSubmit" @reset="handleReset">
      <!--TITLE GOES HERE
      RATING GOES HERE
      PRICE GOES HERE
      SELECT OPTIONS HERE
      DESCRIPTION GOES HERE
      ADDITIONAL DETAILS GO HERE-->

      <b-form-group
        id="sku-group"
        label="SKU"
        label-for="sku">
        <b-form-input
          id="sku"
          type="text"
          v-model="form.SKU"
          required
          :disabled="!canEdit"
          placeholder="Enter SKU">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="product-name-group"
        label="Product Name"
        label-for="product-name">
        <b-form-input
          id="product-name"
          type="text"
          v-model="form.name"
          required
          :disabled="!canEdit"
          placeholder="Enter Product Name">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="product-categories-group"
        label="Categories"
        label-for="product-categories">

        <b-badge class="badge" v-for="(cat, index) in form.categories" :key="index">
          {{cat}}
          <b-button type="button" class="close" @click="deleteCat(cat)">
            <span>&times;</span>
          </b-button>
        </b-badge>
        <br/>
        <b-dropdown
          id="ddown1"
          text="Choose Categories"
        >
          <b-dropdown-item v-for="(cat, index) in categoryList" :key="index" @click="addCat(cat)">
            {{cat}}
          </b-dropdown-item>
        </b-dropdown>
      </b-form-group>

      <b-form-group
        id="description-group"
        label="Description"
        label-for="description">
        <b-form-textarea
          id="description"
          type="text"
          v-model="form.description"
          required
          :disabled="!canEdit"
          :max-rows="6"
          :rows="4"
          placeholder="Enter Description">
        </b-form-textarea>
      </b-form-group>

      <b-form-group
        label="MSRP"
      >
        <b-input-group class="price" prepend="$">
          <b-form-input
            id="msrp"
            type="number"
            required
            :disabled="!canEdit"
            v-model="form.MSRP"
            placeholder="Enter MSRP">
          </b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group
        label="Base Price"
        >
        <b-input-group class="price" prepend="$">
          <b-form-input
            id="price"
            type="number"
            required
            :disabled="!canEdit"
            v-model="form.price"
            placeholder="Enter Base Price">
          </b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group
        id="product-dimension-group"
        label="Product Dimensions"
        label-for="product-dimension"
        style="width:30%;">
        <b-input-group append="mm" class="dimension-input">
          <b-form-input
            id="dimensionX"
            type="number"
            v-model="form.dimensionX"
            required
            >
          </b-form-input>
        </b-input-group>
        <b-input-group append="mm" class="dimension-input">
          <b-form-input
            id="dimensionX"
            type="number"
            v-model="form.dimensionY"
            required
          >
          </b-form-input>
        </b-input-group>
        <b-input-group append="mm" class="dimension-input">
          <b-form-input
            id="dimensionX"
            type="number"
            v-model="form.dimensionZ"
            required
          >
          </b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group
        id="product-image-group"
        label="Upload Thumbnail"
        label-for="product-image">
        <b-form-file
          accept="image/*"
          v-model="form.thumbnail"
          required>
        </b-form-file>
      </b-form-group>

      <b-form-group
        label="Option Groups"
        :disabled="!canEdit"
        >
        <div class="options-group" v-for="(optionGroup, key) in form.optionGroups">
          <b-button v-show="true" class="option-close" v-on:click="deleteOptionGroup(key)"><i class="fa fa-times"></i></b-button>
          <b-form-input
            type="text"
            class="options-group-name"
            required
            v-model="optionGroup.name"
            placeholder="Enter Option Group Name, E.g. Size, Colour">
          </b-form-input>

          <div v-for="(option, key) in optionGroup.product_options">
            <div class="option">
              <b-button v-show="optionGroup.product_options.length > 1" class="option-close" v-on:click="optionGroup.product_options.splice(key,1)"><i class="fa fa-times"></i></b-button>
            <b-form-input class="option-name" v-model="option.name" placeholder="Enter Options" required>
            </b-form-input>
            <b-input-group class="option-price" prepend="$">
              <b-form-input v-model="option.priceDifference" placeholder="Enter Price Difference" required>
              </b-form-input>
            </b-input-group>
            </div>
          </div>
          <b-input-group-append>
            <b-button @click="addOption(key)">Add Option</b-button>
          </b-input-group-append>
        </div>
        <b-input-group-append>
          <b-button @click="addOptionGroup">Add Option Group</b-button>
        </b-input-group-append>
        </b-form-group>

      <b-button type="submit" variant="primary" @submit="handleSubmit">Submit</b-button>

    </b-form>
  </div>

</template>

<script>
  export default {
    layout: 'admin',
    data () {
      return {
        categoryList: [],
        canEdit: true,
        form: {
          categories: [],
          thumbnail: '',
          optionGroups: [
            {
              name: '',
              product_options: [
                {
                  priceDifference: '0',
                  name: ''
                }
              ]
            }
          ]
        }
      }
    },
    created () {
      this.fetchCategories()
    },
    methods: {
      async fetchCategories () {
        const payload = await this.$axios.$get('/products/get_categories')
        this.categoryList = payload.cats
      },
      addCat (cat) {
        this.form.categories.push(cat)
        this.categoryList.splice(this.categoryList.indexOf(cat), 1)
        /* delete this.categoryList[this.categoryList.indexOf(cat)] */
      },
      deleteCat (cat) {
        this.categoryList.push(cat)
        this.form.categories.splice(this.form.categories.indexOf(cat), 1)
      },
      async handleSubmit (evt) {
        evt.preventDefault()
        let formData = new FormData()
        for (var key in this.form) {
          formData.append(key, this.form[key])
        }
        formData.set('optionGroups', JSON.stringify(this.form.optionGroups))
        var response = await this.$axios.$post('/products/create_new_product', formData)
        if (response) {
          // REDIRECT TO HOMEPAGE
          // this.$router.push('./')
          console.log(response)
        } else {
          // THROW UP ERROR
          console.log(response)
        }
      },
      handleReset () {
      },
      addOptionGroup () {
        this.form.optionGroups.push({
          name: '',
          product_options: [
            {
              priceDifference: '0',
              name: ''
            }
          ]
        })
      },
      addOption (key) {
        this.form.optionGroups[key].product_options.push({
          priceDifference: '0',
          name: ''
        })
      },
      deleteOptionGroup (i) {
        this.form.optionGroups.splice(i, 1)
      }
    }
  }
</script>

<style scoped>
  .capsule {
    background-color: white;
    margin-top: 20px;
  }

  .product-edit {
    padding: 40px;
  }
  .options-group {
    border: solid darkgrey 1px;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 10px;
  }

  .option {
    border: solid darkgrey 1px;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 10px;
  }

  .options-group-name {
    width: 90%;
    margin-bottom: 20px;
  }
  .option-name {
    margin-bottom: 20px;
    width: 90%;
  }
  .option-price {
    width: 90%;
  }
  .option-close {
    float: right;
    margin: 5px;
    padding: 0px 5px 0px 5px;
  }
  .close {
    margin-left: .25rem;
    color: inherit;
    font-size: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    padding-left: 5px;
  }
  .dimension-input {
    padding-bottom: 10px;
  }
</style>
