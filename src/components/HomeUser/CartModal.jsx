export default function CartModal(props) {
  const { isOpen, toggleModal } = props;

  return (
    <>
      {isOpen && (
        <>
          {/* Fond sombre avec effet d'ombre */}
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-40"></div>

          {/* Modale principale */}
          <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex="-1"
            aria-hidden="true"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full  ">
              {/* Contenu de la modale */}
              <div className="relative bg-white rounded-lg shadow-lg ">
                {/* En-tête de la modale */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Votre Réservation
                  </h3>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="static-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Corps de la modale */}
                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-base leading-relaxed text-gray-500">
                    Votre réservation a été prise en compte. veuillez vérifier votre page de réservation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
