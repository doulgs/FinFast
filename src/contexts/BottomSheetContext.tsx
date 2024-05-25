import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface BottomSheetContextProps {
  openBottomSheet: (component: ReactNode) => void;
  closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(
  undefined
);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = (component: ReactNode) => {
    if (!isOpen) {
      setContent(component);
      bottomSheetRef.current?.expand();
      setIsOpen(true);
    }
  };

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setContent(null);
    setIsOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setContent(null); // Limpa o conteúdo quando o BottomSheet é fechado
      setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["40%"]}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        style={{ borderWidth: 1, borderRadius: 16 }}
      >
        {content && <>{content}</>}
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
