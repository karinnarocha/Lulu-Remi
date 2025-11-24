import React, {useState} from "react";
import styles from './FAQ.module.css'

const FAQSection = () => {
    const [openQuestionIndex, setOpenQuestiononIndex] = useState(null);
    const toggleFAQ = (index) => {
        if (openQuestionIndex === index){
        setOpenQuestiononIndex(null);
    } else{
        setOpenQuestiononIndex(index);
    }
    
};
return(
        <section className={styles.FAQcontainer}>
            <div className={styles.FAQTitle}>
                <h2>FAQ’s</h2>
            </div>

            <div className={styles.FAQ}>
                {/* REACT QUESTION*/}
                <p className={styles.FAQuestion} onClick={ () => toggleFAQ(1)}>What materials are the stickers made from?</p>
                {/* HIDDING ANSWER*/}
                <p className={`${styles.FAAnswer} ${openQuestionIndex === 1 ? styles.open : ""}`}>Our stickers are printed on safe, high-quality paper that feels smooth and sturdy. The paper is thick enough for kids to color on without tearing easily, and it sticks well to most surfaces like paper, notebooks, and walls. Everything is designed with children in mind, so it’s safe, durable, and fun to use.</p>
            </div>

            <div className={styles.FAQ} >
                <p className={styles.FAQuestion} onClick={ () => toggleFAQ(2)}>Are the stickers reusable or permanent?</p>
                <p className={`${styles.FAAnswer} ${openQuestionIndex === 2 ? styles.open : ""}`}>The stickers are meant to be permanent. Once you place them on a surface, they will stay in place, which makes them perfect for keeping your child’s creations in the book or on display. They are not reusable, so every sticker becomes a little keepsake of your child’s creativity.</p>
            </div>

            <div className={styles.FAQ}>
                <p className={styles.FAQuestion} onClick={ () => toggleFAQ(3)}>What age group is this coloring sticker book best for?</p>
                <p className={`${styles.FAAnswer} ${openQuestionIndex === 3 ? styles.open : ""}`}>This book is made for kids ages 3 and up. Younger children can enjoy coloring with crayons, while older kids can get more detailed using markers or colored pencils. Parents and grandparents often tell us they enjoy coloring right alongside the kids too — it’s a fun activity for the whole family.</p>
            </div>

            <div className={styles.FAQ} >
                <p className={styles.FAQuestion} onClick={ () => toggleFAQ(4)}>Can I use markers or paint to color the stickers?</p>
                <p className={`${styles.FAAnswer} ${openQuestionIndex === 4 ? styles.open : ""}`}>Yes, you can! The stickers work really well with crayons, colored pencils, and markers. If you want to use paint, we recommend light watercolor or very gentle brush strokes so the paper doesn’t wrinkle. For the best results, crayons and markers are the easiest and most fun to use.</p>
            </div>
            <div className={styles.FAQ} >
                <p className={styles.FAQuestion} onClick={ () => toggleFAQ(5)}>How many stickers are included in the book?</p>
                <p className={`${styles.FAAnswer} ${openQuestionIndex === 5 ? styles.open : ""}`}>Each book comes with over 100 different stickers. There are plenty of designs to color, decorate, and share, so kids can keep coming back to the book again and again without running out of fun.</p>
            </div>
        </section>
    );
};
export default FAQSection;