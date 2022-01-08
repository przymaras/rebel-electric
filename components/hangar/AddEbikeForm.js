import AddEbikeDataGroup from "./AddEbikeDataGroup";
import styles from "./AddEbikeForm.module.css";

function AddEbikeForm(props) {
  return (
    <div className={styles.container}>
      <form>
        <div>
          <label>
            <h2 className="rebel-font">Nazwa Projektu:</h2>
          </label>
          <input type="text" />
        </div>
        <p>(będzie wyświetlana nad galerią)</p>
        <div>
          <h2 className="rebel-font">Dodaj zdjęcia:</h2>
          <div>
            <div>Foto 1</div>
            <div>Foto 2</div>
            <div>Foto 3</div>
            <div>Foto 4</div>
            <div>Foto 5</div>
            <div>Foto 6</div>
            <div>Foto 7</div>
            <div>Foto 8</div>
            <div>Foto 9</div>
            <div>Foto 10</div>
          </div>
        </div>
        <div>
          <h2 className="rebel-font">Dodaj prezentację video!</h2>
          <div>
            <label>Link do YouTube:</label>
            <input type="text" />
          </div>
        </div>
        <div>
          <h2 className="rebel-font">Dodaj opis:</h2>
          <p>
            Dodaj opis: Napisz kilka słów o swoim pojeździe - pochwal się jego
            historią, osiągami i ile lat go użytkujesz. Jak zaczęła się Twoja
            historia z elektrykami? Użytkownicy Rebel-electric chętnie dowiedzą
            się więcej informacji o Tobie i Twoim e-bike'u!
          </p>
          <textarea></textarea>
        </div>
        <div>
          <AddEbikeDataGroup type="baza">
            <div>
              <label>Marka</label>
              <select>
                <option>opcja1</option>
                <option>opcja2</option>
              </select>
            </div>
            <div>
              <label>Model</label>
              <select>
                <option>opcja1</option>
                <option>opcja2</option>
              </select>
            </div>
            <div>
              <label>Rok produkcji bazy</label>
              <input type="number" />
            </div>
            <div>
              <fieldset>
                <legend>Rozmiar kół</legend>
                <input type="radio" id="20inch" name="wheelSize" value="20" />
                <label htmlFor="20inch">20 cali</label>
                <input type="radio" id="24inch" name="wheelSize" value="24" />
                <label htmlFor="20inch">24 cale</label>
              </fieldset>
            </div>
            <div>
              <label>Rodzaj hamulców</label>
              <select>
                <option>opcja1</option>
                <option>opcja2</option>
              </select>
            </div>
            <div>
              <label>Masa [kg]</label>
              <input type="number" />
            </div>
            <div>
              <label>Prędkość maksymalna [km/h]</label>
              <input type="number" />
            </div>
            <div>
              <label>Zasięg roweru [km]</label>
              <input type="number" />
            </div>
          </AddEbikeDataGroup>
        </div>
        <button>Dodaj</button>
      </form>
    </div>
  );
}

export default AddEbikeForm;
