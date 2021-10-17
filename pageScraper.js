const URL = 'https://www.booking.com/searchresults.es.html?label=gen173nr-1DCAEoggI46AdIM1gEaFCIAQGYAQq4ARnIAQzYAQPoAQGIAgGoAgO4Ar2RsosGwAIB0gIkMzQ0NzhmNjgtYmM1OC00MDllLThmY2EtMDY3MWRmNTYwMzAx2AIE4AIB;sid=fc2fbf37e47d80597495bb3952088a43;checkin_monthday=17;checkin_year_month=2021-10;checkout_monthday=18;checkout_year_month=2021-10;dest_id=-592318;dest_type=city;from_history=1;group_adults=2;group_children=0;no_rooms=1;si=ad;si=ai;si=ci;si=co;si=di;si=la;si=re;srpvid=5b1590a2e0a50146;sig=v1dz4wU7Jl&;sh_position=1';
const scraperObject = {
  url: URL,
  async scraper(browser) {
    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://booking.com', ['geolocation']);
    await page.goto(this.url);
    await page.waitForSelector('#search_results_table');

    let data = await page.evaluate(() => {
      let results = [];
      var items = document.querySelectorAll('#search_results_table div[data-testid="property-card"]');

      if (items.length === 0) {
        items = document.querySelectorAll('#search_results_table .sr_property_block');
      }

      items.forEach((item) => {
        results.push({
          name: item.querySelector('.sr-hotel__name').innerText,
          price: item.querySelector('.prco-valign-middle-helper').innerText,
          taxes: item.querySelector('.prd-taxes-and-fees-under-price').innerText,
        })
      })

      return results;
    })

    console.log(data);
    await browser.close();
  }
}

module.exports = scraperObject;
