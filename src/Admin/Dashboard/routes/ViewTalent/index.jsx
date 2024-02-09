import { CiSearch } from "react-icons/ci";
import s from "./index.module.scss";
import ActivityChart from "./ActivityChart";
import profile from "../../../../static/images/Kristy.svg";
const ViewTalent = () => {

  return (
    <div className={s.ViewTalent}>
      <div className={s.Stats}>
        <div className={s.ActivityChartWrapper}>
          <h3>Talent ID: 34526732</h3>
        <ActivityChart />
        </div>
        <div className={s.profileOverfiew}>
          <img src={profile} alt="" />
          <h3>Jane DOe</h3>
          <span>
            <button className={s.button}>Accept</button>
            <button className={s.button}>Reject</button>
          </span>
        </div>
      </div>
      <div className={s.Certifications}>
        <div className={s.Header}>
          <h3>Skills</h3>
          <div className={s.searchBar}>
            <input
              className={s.searchInput}
              type="search"
              placeholder={"Search"}
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch
            // onClick={handleSearch}
            />
          </div>
          <h3>Certifications</h3>
        </div>
        <section>
          {" "}
          <div className={s.Skills}>
            <p>
              {" "}
              <span></span>    Creative Writing
            </p>
            <p>
              {" "}
              <span></span>Creative Writing
            </p>

            <p>
              {" "}
              <span></span>Creative Writing
            </p>

            <p>
              {" "}
              <span></span>Creative Writing
            </p>
          </div>
          <div className={s.Certificate}>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
            <p> Certificate 1</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewTalent;
