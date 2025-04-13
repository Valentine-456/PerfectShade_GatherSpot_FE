import EventCard from "@/components/EventCard/EventCard";
import "./Home.css";
import Header from "@/components/header/Header";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <section className="event-list">
        <EventCard
          date="10 June"
          title="Summer Beats Concert"
          goingCount={30}
          location="Aleje Jerozolimskie 54, Warsaw, Poland"
          icon="/assets/icons/music.png"
          image="https://s3-alpha-sig.figma.com/img/5305/51a3/6edfc18222ce0628fab260a350366aeb?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DSf0f0eurPVKZATK8JnpgZATNf4QZJIU9nQAnM0pI5BSQHwAQ-~jph6Er-Hdcpwlbg43xC6orDEwY~Ft5fYUL73IJy~cEODnawEUIiyYoiY~9xDYRs9Bb0rjUHk-86JlVQyouHPKw4lm1F3xyeYDfeaM3fYn~iPHh1dkVYD90R8t1iA6a3gZj6diuT8x6oYGcjb~MaCo~zkFrrACJ6AR2K7ai4m8KAhWJtK7JDXZGdDut7DXuoCIwrKoRdkdzQodLv7PzxVSw9EnFSNiv~Wh2NKy4nQtyHzdCY6yYPn2bq1mncaGHSso~AGgZzjpEKuWXs7AWAu-68SmulHVM4m~aw__"
        />
        <EventCard
          date="10 June"
          title="Modern Art Showcase"
          goingCount={14}
          location="ul. Świętokrzyska 20, Warsaw, Poland"
          icon="/assets/icons/art.png"
          image="https://s3-alpha-sig.figma.com/img/79e7/4617/a6f523facbd176654d3f7f284b9e9180?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K6i3biQy5Tza-K0AfXp7bXEh2y6ThnDrBSjXZBIuvNiwAflmJyOzqF02edhnrTowVTKyxS3g0egxW4VojSvAr4GO9fmdlTPBUgKxAqgNZVfH54CvcpSThwD62hpb4jN97rSBUs7TenPl4a5e1n-KvyfiHtTQJTtAdw4tkF9LTITMbHRHUcEhzd85eVvri9RJuUlIRntGYf2TunCKT2l~yGlIRhPW5gwliz9hTEdvYc4SzoRhhYg9q1Hf291F0L5CwxYnr~o7evgRrGelOHPOjyht3my1NRPHmnP0SkKpphhR-7Vo21xOALCnVMM--haLEzbNZKG41CH9LoDv0FGi6A__"
        />
      </section>
    </div>
  );
};

export default HomePage;
