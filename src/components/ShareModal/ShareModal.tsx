import "./ShareModal.css";

type ShareModalProps = {
  onClose: () => void;
  url: string;
};

const ShareModal = ({ onClose, url }: ShareModalProps) => {
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    onClose();
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Share with friends</h3>
        <div className="share-icons">
          <button onClick={copyLink}>
            🔗
            <br />
            Copy Link
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            target="_blank"
          >
            🟢
            <br />
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
          >
            🔵
            <br />
            Facebook
          </a>
          <a
            href={`https://www.messenger.com/share?link=${url}`}
            target="_blank"
          >
            🟣
            <br />
            Messenger
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
          >
            🐦
            <br />
            Twitter
          </a>
          <a href={`https://www.instagram.com/`} target="_blank">
            📸
            <br />
            Instagram
          </a>
          <a href={`https://web.skype.com/share?url=${url}`} target="_blank">
            🔷
            <br />
            Skype
          </a>
          <button disabled>
            💬
            <br />
            Messages
          </button>
        </div>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
