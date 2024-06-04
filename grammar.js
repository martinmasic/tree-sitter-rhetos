module.exports = grammar({
  name: 'rhetos',

  extras: $ => [
    $.comment,
    /\s/,
  ],

  rules: {
    source_file: $ => repeat($.top_level_statement),

    top_level_statement: $ => choice(
      $.module_statement,
      // $.flat_statement
    ),

    module_statement: $ => seq(
      'Module',
      $.identifier,
      $.module_block
    ),

    identifier: _ => /[_\p{XID_Start}][_\p{XID_Continue}]*/,

    module_block: $ => seq(
      '{',
      $.block_content,
      '}'
    ),

    block_content: $ => repeat($.inner_statement),

    inner_statement: $ => 'test',

    comment: _ => token(choice(
      seq('//', /.*/),
      seq(
        '/*',
        /[^*]*\*+([^/*][^*]*\*+)*/,
        '/',
      ),
    )),
  },


})
