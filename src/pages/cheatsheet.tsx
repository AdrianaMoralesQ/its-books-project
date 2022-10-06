import { SampleComponent } from 'components/Cheatsheet';
import { BooksContext } from 'context';
import { useContext, useEffect } from 'react';

/* 
CONSTANTS
We put our constants at the top of the page, outside of our components
*/
const TAMAL_COLORS = ['grey', 'orange', 'white'];
const TAMAL_BOOTIES = 6;

/* 
This is the Tamal component
it takes props ({ colors })
the first is called colors and it's an array of strings (see the green annotation)

 */
type TamalProps = {
  colors: string[];
  booties: number;
};
const Tamal = ({ colors, booties }: TamalProps) => {
  return (
    <div>
      <h2>Tamal is </h2>
      {/* there are two ways of mapping over an array */}
      <>
        {colors.map((color, i) => (
          <h3 key={`tamal-color${i}`}>{color}</h3>
        ))}
      </>
      {/* this one uses curly braces and return */}
      <>
        {colors.map((color, i) => {
          return <h3 key={`tamal-color${i}`}>{color}</h3>;
        })}
      </>
      <h2>Tamals has {`${booties}`} booties</h2>
    </div>
  );
};

/* what is a component?
it's a react component 
it's named Uppercase something and it's an arrow function
( ) =>{ }
it HAS to return JSX or null (the rest is illegal)
jsx is pretty much html but for react
 */

const Component = () => {
  return <div>whoo</div>;
};
/* How do we use a component? */

const CheatSheet = () => {
  const state = useContext(BooksContext);

  /* if you want to do something when the page loads */
  useEffect(() => {
    /* the empty array means it only does it on mount */
  }, []);

  return (
    <div>
      <h1>Cheatsheet</h1>
      <Tamal colors={TAMAL_COLORS} booties={4} />
      <Tamal colors={[]} booties={TAMAL_BOOTIES} />
      <h2>Components</h2>
      <p>
        When creating a component, make sure you write the component first and
        then pass the props to it
      </p>
      <p>
        See: <code>{`const Tamal = ({ colors }: TamalProps)`}</code>
        <a href="https://frontendmasters.com/courses/complete-react-v7/">
          See react course
        </a>
      </p>
      <h2>Below we have sample components</h2>
      <p>This one is declared in the page file</p>
      {/* To call a component, you write it as if were a html tag */}
      {/* In this case it's JSX */}
      <Component />
      {/* Here we're using a component from another file, but they work the same */}
      <p>this one comes from another file, but does the same thing</p>
      <SampleComponent />
    </div>
  );
};

export default CheatSheet;
