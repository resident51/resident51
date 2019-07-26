const makeStars = () => {
  const stars = [];

  for (var i = 0; i < 1000; i++) {
    var Mtop = Math.floor((Math.random() * i * 10) + 1);
    var Mleft = Math.floor((Math.random() * i * 10) + 1);

    stars[i] = <div key={i} className="star" style={{top: Mtop, left: Mleft}} />
  }

  return stars;
}

const wellShit = () => (<div>
  <div className="moon">
  </div>

  <div className="planet">
    <div className="crater crater-one"></div>
    <div className="crater crater-two"></div>
    <div className="crater crater-three"></div>
  </div>

  <div className="saturn-container">
    <div className="saturn"></div>
    <div className="circle"></div>
  </div>

  <div id="stars">
    {makeStars()}
  </div>

  <div className="star-filante"></div>

</div>)