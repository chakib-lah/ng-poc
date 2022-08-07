<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MovieRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
#[ApiResource]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private $title;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private $country;

    #[ORM\Column(type: 'date', nullable: true)]
    private $dateRelease;

    #[ORM\ManyToMany(targetEntity: Actors::class, mappedBy: "movies")]
    private $actors;

    #[ORM\ManyToMany(targetEntity: Categories::class, mappedBy: "categories")]
    private $categories;

    #[ORM\ManyToOne(targetEntity: Authors::class, inversedBy: "movies")]
    private $authors;

    public function __construct()
    {
        $this->actors = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string|null $title
     * @return $this
     */
    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getCountry(): ?string
    {
        return $this->country;
    }

    /**
     * @param string $country
     * @return Movie
     */
    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getDateRelease(): DateTime
    {
        return $this->dateRelease;
    }

    /**
     * @param DateTime $dateRelease
     * @return Movie
     */
    public function setDateRelease(DateTime $dateRelease): self
    {
        $this->dateRelease = $dateRelease;

        return $this;
    }

    /**
     * @return Collection|Actors[]
     */
    public function getActors(): Collection
    {
        return $this->actors;
    }

    public function addActor(Actors $actor): self
    {
        if (!$this->actors->contains($actor)) {
            $this->actors[] = $actor;
        }
        return $this;
    }

    public function removeActor(Actors $actor): self
    {
        $this->actors->removeElement($actor);

        return $this;
    }

    /**
     * @return Collection|Actors[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategorie(Categories $categories): self
    {
        if (!$this->categories->contains($categories)) {
            $this->categories[] = $categories;
        }
        return $this;
    }

    public function removeCategorie(Categories $categories): self
    {
        $this->categories->removeElement($categories);

        return $this;
    }

    /**
     * @return Authors|null
     */
    public function getAuthors(): ?Authors
    {
        return $this->authors;
    }

    /**
     * @param Authors|null $authors
     * @return Movie
     */
    public function setAuthors(?Authors $authors): self
    {
        $this->authors = $authors;
        return $this;
    }


}
