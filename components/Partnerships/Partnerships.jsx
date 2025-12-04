"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Partnerships.module.css";

export default function Partnerships() {
  return (
    <div className={styles.Partnershipsection}>
      <div>
        <h1>Featured on!</h1>
      </div>

      <div className={styles.PartnershipImagessection}>

        {/* ETSY */}
        <Link 
          href="https://www.etsy.com/listing/4400012794/hanukkah-coloring-sticker-book-for-kids?ref=shop_home_active_2" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Image
            src="/images/EtzyLogo.png"
            alt="Etsy Logo"
            className={styles.PartnershipLogo}
            width={300}
            height={150}
            data-aos="flash"
          />
        </Link>

        {/* EBAY */}
        <Link 
          href="https://www.ebay.com/itm/146943114282"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/EBayLogo.png"
            alt="eBay Logo"
            className={styles.PartnershipLogo}
            width={300}
            height={120}
            data-aos="flash"
          />
        </Link>

      </div>
    </div>
  );
}
