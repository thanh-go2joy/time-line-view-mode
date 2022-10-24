
export default {
  methods: {
    setLoginBy (value) {
      switch (value) {
        case 1:
          return 'Manual'
        case 2:
          return 'Facebook'
        case 3:
          return 'Google'
        case 4:
          return 'Apple'
        default:
          return 'Undefine'
      }
    }
  }
}
