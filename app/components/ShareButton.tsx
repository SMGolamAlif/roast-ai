import { useRef } from "react";
import html2canvas from "html2canvas";

interface ShareButtonProps {
  shareRef: React.RefObject<HTMLDivElement>;
}

export default function ShareButton({ shareRef }: ShareButtonProps) {
  // Handler for capturing and sharing the conversation
  function handleCapture() {
    console.log('Camera button clicked!');
    
    if (!shareRef.current) {
      console.log('Share ref not found');
      alert('Share ref not found');
      return;
    }
    
    console.log('Share ref found, starting capture...');
    
    // Use a timeout to ensure the DOM is ready
    setTimeout(async () => {
      try {
        console.log('About to call html2canvas...');
        const canvas = await html2canvas(shareRef.current!, {
          backgroundColor: '#000000',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
        });
        
        console.log('Canvas created successfully', canvas);
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            console.log('Blob created, downloading...');
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'roast-ai-share.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log('Download initiated');
          } else {
            console.error('Failed to create blob');
            alert('Failed to create blob');
          }
        }, 'image/png');
      } catch (error) {
        console.error('Failed to capture image:', error);
        alert(`Failed to capture image: ${error}`);
      }
    }, 100);
  }

  return (
    <div className="flex gap-3 mt-4 items-center justify-center">
      <button
        onClick={() => window.location.href = "/"}
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-md shadow hover:from-blue-400 hover:to-purple-400 transition"
        type="button"
      >
        Send New Message
      </button>
      
      {/* Camera/Share button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Button click detected!');
          handleCapture();
        }}
        className="bg-zinc-700 text-blue-200 p-3 rounded-md border border-blue-400 hover:bg-zinc-800 transition cursor-pointer"
        title="Share as Image"
        type="button"
        style={{ pointerEvents: 'auto', zIndex: 10 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      </button>
      
      {/* Test button for debugging */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Test button clicked!');
          alert('Test button works!');
        }}
        className="bg-red-600 text-white px-3 py-2 rounded text-sm cursor-pointer"
        type="button"
        style={{ pointerEvents: 'auto', zIndex: 10 }}
      >
        Test
      </button>
    </div>
  );
}
