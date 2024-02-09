
const Country = ({ country, handleDetails }) => {
  return (
    <>
      <div>
        {country.name.common} {' '}
      <button onClick={handleDetails}>show</button>
      </div>
    </>
  );
};

export default Country;
