export default function getData({ oldData }) {
  const resolvers = `
        (name) => {
           function kebabCase(key: string) {
                const result = key.replace(/([A-Z])/g, ' $1').trim();
                return result.split(' ').join('-').toLowerCase();
            }
          if (name.match(/^Wd[A-Z]/)) {
            const compName = kebabCase(name);
            return {
              name,
              from: \`wot-design-uni/components/\$\{compName}/\$\{compName\}.vue\`,
            }
          }
        }
      `;
  const autoImportPlugin = {
    id: 'autoComponents',
    extraResolvers: resolvers,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'autoComponents');
  if (configIndex !== -1) {
    oldData[configIndex].extraResolvers = (oldData[configIndex].extraResolvers || '') + autoImportPlugin.extraResolvers;
  }
  return oldData;
}
