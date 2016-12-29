import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  attrs: {
    creator: {serialize: false},
    createdAt: {serialize: false},
    updatedAt: {serialize: false}
  }
})