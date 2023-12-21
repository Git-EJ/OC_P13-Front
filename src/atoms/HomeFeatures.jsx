const HomeFeatures = () => {
  
  const arrayOfFeatures = [
    {
      img: "/src/assets/img/icon-chat.png",
      alt: "Chat Icon",
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      img: "/src/assets/img/icon-money.png",
      alt: "Money Icon",
      title: "More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!",
    },
    {
      img: "/src/assets/img/icon-security.png",
      alt: "Security Icon",
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>

      {arrayOfFeatures.map((feature, index) => {
        return (
          <div className="feature-item" key={`feature${index}`}>
            <img src={feature.img} alt={feature.alt} className="feature-icon" />
            <h3 className="feature-item-title">{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        );
      })}
    </section>
  );
};

export default HomeFeatures;
