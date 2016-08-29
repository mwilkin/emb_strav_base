import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('race-bucket-display', 'Integration | Component | race bucket display', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{race-bucket-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#race-bucket-display}}
      template block text
    {{/race-bucket-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
