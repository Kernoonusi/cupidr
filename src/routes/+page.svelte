<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<main class="w-full bg-[#E3EBE4] h-full relative overflow-hidden pb-[100px]">
  <div
    class="w-[2300px] h-[2300px] rounded-full border-yellow-400 bg-transparent mt-8 border-solid border-2 absolute left-[-200px] z-[0]"
  />
  <div
    class="w-full max-w-[1200px] px-5 m-auto mt-[50px] sm:mt-[50px] md:mt-0 mb-[150px] sm:mb-[150px] md:mb-[70px] md:py-[65px] flex flex-col-reverse md:flex-row gap-10 md:justify-around 2xl:justify-between z-[1] relative items-center"
  >
    <div
      class="flex flex-col gap-4 relative items-center sm:items-center md:items-start"
    >
      <img class="absolute left-8 top-[-40px] z-[-1]" src="/dotted-ellipse.png" alt="" />
      <h1 class="text-black font-bold slogan text-6xl sm:text-6xl text-center md:text-left sm:text-center">
        Meet the <br />
        <span class="text-[#C80241] underline-offset-4 underline decoration-4">chosen one</span>
      </h1>
      <p class="text-[#5F5F5F] text-center sm:text-center md:text-start">
        Find your perfect match with <br /> <span class="text-[#C80241]">CUPIDR</span>, the ultimate
        dating app.
      </p>
      <button on:click={() => goto("/auth")} class="bg-[#C80241] flex gap-4 items-center w-fit px-8 py-4 rounded-lg hover:bg-[#ff0051] transition-colors"
        ><img src="/black-heart.png" alt="" />
        <p class="text-white">Get started now</p></button
      >
    </div>
    <div class="relative">
      <img class="w-[500px] sm:w-[500px] md:w-[400px] lg:w-[600px] xl:w-[700px]" src="/main-poster.png" alt="" />
      <svg
        class="absolute right-[430px] top-[40px] sm:right-[430px] sm:top-[40px] md:right-[330px] md:top-[50px] lg:right-[500px] lg:top-[100px] xl:right-[600px] xl:top-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="9.5" stroke="#E24648" />
      </svg>
      <svg
        class="absolute right-[170px] top-[-20px] sm:right-[170px] sm:top-[-20px] md:right-[100px] md:top-[70px] lg:right-[200px] lg:top-[90px] xl:right-[250px] xl:top-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="10" fill="#E24648" />
      </svg>
      <svg
        class="absolute right-[-15px] top-[270px] sm:right-[-15px] sm:top-[270px] md:right-[30px] md:top-[250px] lg:right-[30px] lg:top-[370px] xl:right-[50px] xl:top-[440px]"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <circle cx="18" cy="18" r="18" fill="#598978" />
      </svg>
    </div>
  </div>
  <div class="absolute left-[50%] translate-x-[-50%] bottom-[-150px] sm:bottom-[-150px] md:bottom-[-370px]">
    <svg
      class="w-[800px] sm:w-[800px] lg:w-[1920px] md:w-[1400px] h-[400px] sm:h-[400px] md:h-[661px]"
      xmlns="http://www.w3.org/2000/svg"
      height="661"
      viewBox="0 0 1920 661"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M962.667 0C443.333 0 0 141.055 0 141.055V331.222C91.314 297.795 556.569 135 956.768 135C1357.24 135 1828.08 298.019 1920 331.291V141.055C1920 141.055 1482 0 962.667 0ZM1920 333.418C1917.48 332.504 1914.65 331.487 1911.54 330.373C1896.1 324.85 1873.55 316.957 1845.08 307.485C1788.15 288.541 1707.6 263.281 1613.11 238.021C1424.12 187.493 1179.5 137 956.768 137C734.034 137 491.039 187.493 303.66 238.02C209.985 263.279 130.24 288.539 73.9157 307.483C45.7542 316.955 23.4491 324.847 8.18683 330.371C5.18183 331.458 2.44987 332.454 0 333.352V661H1920V333.418ZM1588.2 142.797C1583.74 156.049 1565.55 161.887 1547.56 155.837C1529.58 149.787 1518.61 134.139 1523.07 120.887C1527.53 107.635 1545.72 101.797 1563.71 107.847C1581.69 113.897 1592.66 129.544 1588.2 142.797ZM527.805 269.442C540.575 265.677 548.313 253.755 545.087 242.813C541.862 231.87 528.894 226.052 516.123 229.817C503.353 233.581 495.615 245.504 498.841 256.446C502.066 267.388 515.034 273.207 527.805 269.442ZM692.522 93.4828C704.907 89.8317 712.158 78.3742 709.128 68.0955C706.098 57.8167 693.792 52.1247 681.406 55.7758C669.021 59.4269 661.77 70.8843 664.8 81.1631C667.83 91.4419 680.136 97.1339 692.522 93.4828ZM692.805 94.4419C705.575 90.6773 713.313 78.7549 710.087 67.8127C706.862 56.8705 693.894 51.0519 681.123 54.8166C668.353 58.5813 660.615 70.5036 663.841 81.4458C667.066 92.3881 680.034 98.2066 692.805 94.4419ZM1213.02 207.336C1217.3 218.562 1215.03 231.155 1207.74 242.487C1200.46 253.817 1188.19 263.819 1172.63 269.75C1157.08 275.681 1141.26 276.389 1128.28 272.787C1115.3 269.184 1105.22 261.297 1100.94 250.072C1096.66 238.847 1098.93 226.253 1106.22 214.922C1113.5 203.591 1125.78 193.589 1141.33 187.659C1156.88 181.728 1172.7 181.019 1185.68 184.622C1198.66 188.225 1208.74 196.111 1213.02 207.336ZM1213.95 206.98C1222.79 230.165 1204.45 258.687 1172.99 270.684C1141.52 282.682 1108.85 273.613 1100.01 250.429C1091.17 227.244 1109.51 198.722 1140.97 186.724C1172.44 174.726 1205.11 183.795 1213.95 206.98Z"
        fill="black"
      />
    </svg>
  </div>
</main>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
  * {
    font-family: 'Sora', sans-serif;
  }

  @media (min-width: 768px) and (max-width: 1150px) {
    .slogan {
      font-size: 35px;
      line-height: 1;
    }
  }

  @media (min-width: 1150px) {
    .slogan {
      font-size: 60px;
      line-height: 1;
    }
  }
</style>
