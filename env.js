let env ={
  NODE_ENV: ''
}
if(process.env.mode === 'testing'){
  env.NODE_ENV = 'testing'
}
else if(process.env.mode === 'development') {
  env.NODE_ENV = 'development'
}

export default env