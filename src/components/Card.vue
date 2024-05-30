<template>
  <div class="card">
    <div class="card-image-wrapper">
      <img :src="imageSrc" :alt="name" />
    </div>
    <div class="card-content-wrapper">
      <div class="section">
        <h2 class="name">{{ name }}</h2>
        <span class="status">
          <span class="status-icon" :class="status.toLowerCase()"></span>
          {{ status }} - {{ species }}
        </span>
      </div>

      <div class="section">
        <span class="text-gray">Last known location:</span>
        <p>{{ location }}</p>
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        <p>{{ firstSeenIn }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "Card Image",
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    firstSeenIn: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  margin: 0.75rem;
  width: 600px;
  height: auto;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.text-gray {
  color: rgb(158, 158, 158);
}

.card-image-wrapper {
  flex: 2 1 0%;
  width: 100%;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  object-fit: cover;
}

.card-content-wrapper {
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex: 3 1 0%;
  flex-direction: column;
}

.card-content-wrapper section {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
}

.card-content-wrapper .name {
  font-size: 1.5rem;
  font-weight: 800;
}

.status-icon {
  display: inline-block;
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  border-radius: 50%;
}

.status-icon.alive {
  background: rgb(85, 204, 68);
}

.status-icon.dead {
  background: rgb(214, 61, 46);
}

.status-icon.unknown {
  background: rgb(158, 158, 158);
}

.status {
  text-transform: capitalize;
}

h2 {
  line-height: 1.1;
}

span {
  font-size: 16px;
  font-weight: 500;
}

h2,
span {
  margin: 0;
  padding: 0;
}

p {
  font-size: 23px;
}

.card-content-wrapper section:first-child {
  justify-content: flex-start;
}

@media (max-width: 40.625em) {
  .card {
    flex-direction: column;
    height: initial;
    width: 100%;
  }

  .card-image-wrapper {
    width: 100%;
  }

  .card img {
    height: 300px;
  }

  .card-content-wrapper .section + .section {
    margin-top: 1.25rem;
  }
}
</style>
