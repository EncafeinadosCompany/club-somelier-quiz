import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { ResultsType } from '@/common/hooks/useEventSocket';

interface ShareOptions {
  show: boolean;
  text: string;
  links: {
    whatsapp: string;
    facebook: string;
    email: string;
  };
}

interface ShareResultsModalProps {
  shareOptions: ShareOptions;
  onClose: () => void;
}

export function ShareResultsModal({ shareOptions, onClose }: ShareResultsModalProps) {
  if (!shareOptions.show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        className="bg-[var(--background-secondary)] rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Compartir resultados</h3>

        <div className="mb-5 p-4 bg-[var(--background-primary)]/50 rounded-xl">
          <p className="text-[var(--text-secondary)] whitespace-pre-line">{shareOptions.text}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <a
            href={shareOptions.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-green-600/90 hover:bg-green-600 text-white rounded-xl transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.029 18.88a7.056 7.056 0 01-3.395-.864l-3.768 1.118 1.138-3.81A7.04 7.04 0 015.02 11.811a7.02 7.02 0 017.004-7.022 6.99 6.99 0 014.971 2.059 6.987 6.987 0 012.059 4.975c-.001 3.865-3.155 7.058-7.025 7.058z" />
            </svg>
            Compartir por WhatsApp
          </a>

          <a
            href={shareOptions.links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-blue-600/90 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Compartir por Facebook
          </a>

          <a
            href={shareOptions.links.email}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-[var(--accent-primary)]/90 hover:bg-[var(--accent-primary)] text-white rounded-xl transition-colors"
          >
            <Mail className="w-6 h-6" />
            Compartir por Email
          </a>
        </div>

        <button
          className="w-full mt-5 p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
