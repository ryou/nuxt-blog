export default (fileName) => {
  const pathArray = fileName.split('/')

  return `/${pathArray[1]}/${pathArray[3]}/`
}
