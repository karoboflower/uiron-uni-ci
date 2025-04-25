export default function getData({ oldData }) {
  const baseAppTemplate = {
    id: 'tailAppTemplate',
    config: {
      stylecontent: `@import url('tailwindcss/base');
  @import url('tailwindcss/components');
  @import url('tailwindcss/utilities');`,
    },
  };
  oldData.push(baseAppTemplate);
  return oldData;
}
