import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  attrs: {
    hashId: {serialize: false},
    createdAt: {serialize: false},
    updatedAt: {serialize: false}
  }
})
