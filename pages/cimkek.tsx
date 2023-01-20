import {NextSeo} from 'next-seo';
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {getAllTags} from '../helpers/getPosts';
import {TagCloudData, TagCloudDataEntry, TagsProps} from '../types/TagsPage';
import {Tag} from '../types/TagsResponse';
import styles from '../styles/Tags.module.scss';
import * as _ from 'lodash';
import {TagCloud} from 'react-tagcloud';
import {useRouter} from 'next/router';

export default function Tags({tags}: TagsProps) {
  const [data, setData] = useState<TagCloudData>([]);
  const router = useRouter();

  useEffect(() => {
    const newData: TagCloudData = _.map(tags, tag => {
      return {
        value: tag.name,
        count: tag.count,
        key: tag.id,
      };
    });

    setData(newData);
  }, [tags]);

  function navigateToTagPage(tag: string) {
    router.push(`/cimkek/${tag}`);
  }

  return (
    <>
      <NextSeo
        title={'Címkék | Menger Intézet'}
        openGraph={{
          url: `https://menger.hu/cimkek/`,
          title: `Címkék | Menger Intézet`,
          type: 'article',
          images: [
            {
              url: '/assets/images/fb-featured.png',
              width: 1200,
              height: 630,
              type: 'image/png',
            },
          ],
        }}
      />
      <Layout>
        <div className={styles.tagsContainer}>
          <div className={styles.tagCloudContainer}>
            <TagCloud
              minSize={20}
              maxSize={70}
              tags={data}
              onClick={(tag: TagCloudDataEntry) => navigateToTagPage(tag.value)}
              colorOptions={{
                hue: 'blue',
                luminosity: 'bright',
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const tags: Array<Tag> = await getAllTags().then(tags => {
    return _.filter(tags, tag => {
      return tag.count > 0;
    });
  });

  const props: TagsProps = {
    tags: tags,
  };

  return {props: props};
}
