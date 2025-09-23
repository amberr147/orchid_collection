import OrchidsContainer from './components/OrchidsContainer';

function App() {
  return (
    <>
      <div style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#6c3483', fontSize: '2.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
          Orchid Collection
        </h1>
      </div>
      <OrchidsContainer />
    </>
  );
}
export default App;