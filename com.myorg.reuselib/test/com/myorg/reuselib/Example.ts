import { ExampleColor } from 'com/myorg/reuselib/library';
import Example from 'com/myorg/reuselib/Example';

// Create a new instance of the Example control and
// place it into the DOM element with the id "content"
new Example({
  text: 'Example',
  color: ExampleColor.Highlight,
}).placeAt('content');
