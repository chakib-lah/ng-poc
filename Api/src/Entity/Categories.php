<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
#[ApiResource(
    denormalizationContext: ['groups' => ['categories:write']],
    normalizationContext: ['groups' => ['categories:read']],
)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['categories:write', 'categories:read'])]
    private $type;

    #[ORM\ManyToMany(targetEntity: Movie::class, inversedBy: "categories")]
    #[ORM\JoinTable(name: "movies_categories")]
    #[Groups(['categories:read'])]
    private $movies;

    public function __construct()
    {
        $this->movies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection|Movie[]
     */
    public function getMovies(): Collection
    {
        return $this->movies;
    }

    public function addMovie(Movie $movie): self
    {
        if (!$this->movies->contains($movie)) {
            $this->movies[] = $movie;
            $movie->addCategorie($this);
        }
        return $this;
    }

    public function removeMovie(Movie $movie): self
    {
        if ($this->movies->removeElement($movie)) {
            $movie->removeCategorie($this);
        }
        return $this;
    }
}
