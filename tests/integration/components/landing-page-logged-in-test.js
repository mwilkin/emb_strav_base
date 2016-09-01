import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('landing-page-logged-in', 'Integration | Component | landing page logged in', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{landing-page-logged-in}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#landing-page-logged-in}}
      template block text
    {{/landing-page-logged-in}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
