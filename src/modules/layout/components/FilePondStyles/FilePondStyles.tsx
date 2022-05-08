export const FilePondStyles: React.FC = () => {
  return (
    <style global jsx>{`
      .filepond--panel-root {
        background-color: #ffffff;
        border: 3px solid #2c3340;
        border-radius: unset;
      }

      .filepond--drop-label label {
        font-size: 1.8rem;
      }

      @media (min-width: 600px) {
        .filepond--item {
          width: calc(50% - 0.5em);
        }
      }

      @media (min-width: 1280px) {
        .filepond--item {
          width: calc(33% - 0.5em);
        }
      }
    `}</style>
  );
};
