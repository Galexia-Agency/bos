import { set } from 'vue'
import ProductClass from '../index'
import { getValues } from '~/models/genericProperty'

export default {
  initialise (state, { data, rootState }) {
    const allModels = []
    data.forEach((model) => {
      const hydratedModel = new ProductClass(model, rootState)
      allModels.push(getValues(hydratedModel))
    })
    state.all = [...allModels]
  },
  update (state, { data, rootState }) {
    const hydratedModel = new ProductClass(data, rootState)
    const index = state.all.findIndex((item) => item.id === data.id)
    if (index !== -1) {
      const updatedItem = { ...state.all[index], ...getValues(hydratedModel) }
      set(state.all, index, updatedItem)
    }
  }
}