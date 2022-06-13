

module.exports = function math( options ) { 

  this.add( 'role:math,cmd:get', function sum( msg, respond ) {
    respond( null, { answer: "GET" } )
  })

  this.add( 'role:math,cmd:create', function product( msg, respond ) {
    respond( null, { answer: "create" } )
  })
  this.add( 'role:math,cmd:edit', function sum( msg, respond ) {
    respond( null, { answer: "edit" } )
  })

  this.add( 'role:math,cmd:delete', function product( msg, respond ) {
    respond( null, { answer: "delete" } )
  
  })

}
