import dayjs from 'dayjs'

export const dateTimeMixins = {
  methods: {
    formatDate(date: Date | string) {
      return dayjs(date).format('MMM DD, YYYY')
    },
  },
}
