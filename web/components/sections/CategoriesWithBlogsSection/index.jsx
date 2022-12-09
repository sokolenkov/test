import {useRef, useState} from 'react'

import BlogCard from '../../BlogCard'
import Pagination from '../../Pagination'
import SearchPanel from '../../SearchPanel'
import CategoriesList from '../../CategoriesList'

import {filterBlogsByQuery} from '../../../utils'
import usePaginate from '../../../utils/hooks/usePaginate'

export default function CategoriesWithBlogsSection({categories = [], defaultCategory, blogs = []}) {
  const scrollToRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchingQuery, setSearchingQuery] = useState(defaultCategory?.title ?? '')
  const [isSearchPanelVisible, setSearchPanelVisible] = useState(false)
  const filteredBlogs = filterBlogsByQuery(blogs, searchingQuery)
  const paginatedBlogs = usePaginate(filteredBlogs, 6)

  const callSetPageAndScroll = (callback) => {
    // scroll to the categories after user interact with pagination
    if (scrollToRef.current && window) {
      const scrollDistance = scrollToRef.current.offsetTop
      const offset = 30
      setTimeout(() => {
        window.scrollTo(0, scrollDistance - offset)
      }, 100)
    }
    callback()
  }

  const handleQueryChange = (e) => {
    if (e?.target) setSearchingQuery(e.target.value)
  }

  const handleCategoryClick = (category) => {
    setSearchingQuery(category)
  }

  return (
    <section className="overflow-hidden pb-[100px] lg:pb-[140px]">
      <div className="container px-0 lg:px-8">
        <div className="relative mb-6 lg:mb-[56px]" ref={scrollToRef}>
          <div className="flex overflow-x-auto px-4 lg:px-0">
            <CategoriesList
              query={searchingQuery}
              categories={categories}
              isSearchVisible={isSearchPanelVisible}
              toggleSearch={() => setSearchPanelVisible(!isSearchPanelVisible)}
              onCategoryClick={handleCategoryClick}
            />
          </div>
          <SearchPanel
            isVisible={isSearchPanelVisible}
            query={searchingQuery}
            onQueryChange={handleQueryChange}
            onClearSearch={() => setSearchingQuery('')}
          />
        </div>

        {paginatedBlogs?.length > 0 ? (
          <ul
            className="blog__list grid grid-cols-1 gap-4 px-4 mb-[72px]
            sm:grid-cols-2
            lg:grid-cols-3 lg:gap-6 lg:px-0"
          >
            {paginatedBlogs[currentPage].map((blogData, idx) => (
              <li className="flex" key={blogData.slug.current + idx}>
                <BlogCard {...blogData} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex min-h-[556px] items-center justify-center">
            <p className="subtitle-s text-secondary">More blogs coming soon</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="flex justify-center px-4 py-2 shrink-0 min-w-fit">
            <Pagination
              currentPage={currentPage}
              totalPages={paginatedBlogs?.length ?? 0}
              setCurrentPage={(pageIndex) => callSetPageAndScroll(() => setCurrentPage(pageIndex))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
