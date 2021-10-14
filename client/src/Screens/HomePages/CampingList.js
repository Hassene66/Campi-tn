import React, { Fragment } from "react";
import "./CampingList.css";
const CampingList = () => {
  return (
    <section className="text-center">
      <div className="section-campgrounds p-3" id="campground-section">
        <div className="container">
          <h1 className="text-primary section-header">Les Lieu de Camping</h1>
          <p className="sub-text">
            View our hand-picked campgrounds from all over the world
          </p>
        </div>
      </div>

      <Fragment className="container">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card">
              <div
                className="bg-image hover-overlay ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                  className="img-fluid"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </div>
              <div className="card-body">
                <h5 className="card-title">Post title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" className="btn btn-primary">
                  Read
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card">
              <div
                className="bg-image hover-overlay ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/standard/nature/022.jpg"
                  className="img-fluid"
                />
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </div>
              <div className="card-body">
                <h5 className="card-title">Post title2</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#!" className="btn btn-primary">
                  Read
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </section>
  );
};

export default CampingList;
