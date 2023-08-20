module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
                @import "src/styles/_variables.scss";
                @import "src/styles/_calendar.scss";
                @import "src/styles/_palette.scss";
                `,
      },
    },
  },
};
