// app/page.tsx
// Basic HTML homepage with skeleton placeholders

export default function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Skeleton */}
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>AI Email-to-Day Planner</h1>
        <p>Your intelligent daily schedule generated from your inbox.</p>
      </header>

      {/* Main Content Skeleton */}
      <main style={{ display: 'flex', gap: '20px' }}>
        
        {/* Left Column: Info/Login */}
        <section style={{ flex: 1, padding: '20px', border: '1px dashed #aaa', borderRadius: '8px' }}>
          <h2>Get Started</h2>
          <p>[ Description Placeholder: How the app works ]</p>
          <div style={{ marginTop: '20px' }}>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
              [ Login with Google ]
            </button>
          </div>
        </section>

        {/* Right Column: Preview/Mockup */}
        <section style={{ flex: 1, padding: '20px', border: '1px dashed #aaa', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2>Preview</h2>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {/* Task Item Skeleton */}
            <li style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px', backgroundColor: '#fff' }}>
              <strong>[ 9:00 AM ]</strong> Placeholder Task 1
            </li>
            <li style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px', backgroundColor: '#fff' }}>
              <strong>[ 10:30 AM ]</strong> Placeholder Task 2
            </li>
            <li style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px', backgroundColor: '#fff' }}>
              <strong>[ 1:00 PM ]</strong> Placeholder Task 3
            </li>
          </ul>

        </section>
      </main>

      {/* Footer Skeleton */}
      <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '10px', textAlign: 'center', color: '#666' }}>
        <p>[ Footer text placeholder ]</p>
      </footer>

    </div>
  );
}
