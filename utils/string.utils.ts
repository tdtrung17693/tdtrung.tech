export const stringMixins = {
  methods: {
    titleize(value: string) {
      return value.replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase())
    },
  },
}
