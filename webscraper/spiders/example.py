import scrapy


class ExampleSpider(scrapy.Spider):
    name = "example"
    allowed_domains = ["persana.com"]
    start_urls = ["https://persana.com"]

    def parse(self, response):
        for link in response.css('a::attr(href)').getall():
            yield response.follow(link, self.parse)
        
        yield {
            'url': response.url,
            'html': response.text,
        }
